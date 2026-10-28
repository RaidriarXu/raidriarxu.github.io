import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const failures = [];
const externalLinks = new Set();
let checkedReferences = 0;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const file = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(file) : [file];
    }),
  );
  return nested.flat();
}

let files;
try {
  files = await walk(root);
} catch {
  console.error("No out/ folder found. Run npm run build first.");
  process.exit(1);
}
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const htmlByFile = new Map(
  await Promise.all(
    htmlFiles.map(async (file) => [file, await readFile(file, "utf8")]),
  ),
);
const indexHtml = htmlByFile.get(path.join(root, "index.html"));
if (!indexHtml) throw new Error("Missing exported homepage: out/index.html");
const inferredBasePath =
  indexHtml.match(/(?:src|href)=["']([^"']*?)\/_next\//)?.[1] ?? "";
const baseArgIndex = process.argv.indexOf("--base-path");
const basePath = (
  baseArgIndex < 0
    ? (process.env.NEXT_PUBLIC_BASE_PATH ?? inferredBasePath)
    : process.argv[baseArgIndex + 1]
).replace(/\/$/, "");
const decodeAttribute = (value) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
const relativeName = (file) =>
  path.relative(root, file).split(path.sep).join("/");
const attributesOf = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(/(?:^|\s)([\w:-]+)=["']([^"']*)["']/g)].map(
      ([, name, value]) => [name.toLowerCase(), decodeAttribute(value)],
    ),
  );
const indexCanonical = [...indexHtml.matchAll(/<link\b([^>]*?)>/gi)]
  .map(([, attributes]) => attributesOf(attributes))
  .find((attributes) => attributes.rel === "canonical")?.href;
let siteOrigin;
try {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || indexCanonical;
  if (configuredUrl) siteOrigin = new URL(configuredUrl).origin;
} catch {
  failures.push("Invalid configured site origin or homepage canonical URL");
}
const idsByFile = new Map();

for (const [file, html] of htmlByFile) {
  const ids = [...html.matchAll(/\sid=["']([^"']+)["']/g)].map((match) =>
    decodeAttribute(match[1]),
  );
  if (new Set(ids).size !== ids.length)
    failures.push(`${relativeName(file)}: duplicate HTML id`);
  idsByFile.set(file, new Set(ids));
}

async function checkReference(raw, sourceFile, kind = "link") {
  let value = decodeAttribute(raw).trim();
  if (/^(?:data:|blob:)/i.test(value)) return;
  if (/^mailto:/i.test(value)) {
    if (!/^mailto:[^@\s?]+@[^@\s?]+\.[^@\s?]+(?:\?.*)?$/.test(value))
      failures.push(`${relativeName(sourceFile)}: invalid email link ${value}`);
    return;
  }
  if (/^tel:/i.test(value)) return;
  if (/^(?:https?:)?\/\//i.test(value)) {
    try {
      const absolute = new URL(
        value.startsWith("//") ? `https:${value}` : value,
      );
      if (
        absolute.origin === siteOrigin ||
        ["localhost", "127.0.0.1", "[::1]"].includes(absolute.hostname)
      ) {
        value = `${absolute.pathname}${absolute.search}${absolute.hash}`;
      } else {
        externalLinks.add(value);
        return;
      }
    } catch {
      failures.push(
        `${relativeName(sourceFile)}: malformed external URL ${value}`,
      );
      return;
    }
  }
  if (!value || value === "#" || /^[a-z]+:/i.test(value)) {
    failures.push(
      `${relativeName(sourceFile)}: invalid ${kind} ${JSON.stringify(value)}`,
    );
    return;
  }
  const sourceRelative = relativeName(sourceFile);
  const sourceRoute = sourceRelative.endsWith("index.html")
    ? sourceRelative.slice(0, -10)
    : sourceRelative;
  let target;
  try {
    target = new URL(
      value,
      `https://static-preview.invalid${basePath}/${sourceRoute}`,
    );
  } catch {
    failures.push(`${sourceRelative}: cannot resolve ${value}`);
    return;
  }
  let pathname;
  try {
    pathname = decodeURIComponent(target.pathname);
  } catch {
    failures.push(`${sourceRelative}: malformed encoded path ${value}`);
    return;
  }
  if (
    basePath &&
    pathname !== basePath &&
    !pathname.startsWith(`${basePath}/`)
  ) {
    failures.push(
      `${sourceRelative}: ${value} escapes deployed base path ${basePath}`,
    );
    return;
  }
  const localPath = pathname.slice(basePath.length).replace(/^\/+/, "");
  let resolved = path.resolve(root, localPath);
  if (resolved !== root && !resolved.startsWith(root + path.sep)) {
    failures.push(`${sourceRelative}: ${value} escapes output directory`);
    return;
  }
  let result = await stat(resolved).catch(() => null);
  if (result?.isDirectory()) {
    resolved = path.join(resolved, "index.html");
    result = await stat(resolved).catch(() => null);
  }
  checkedReferences += 1;
  if (!result?.isFile()) {
    failures.push(`${sourceRelative}: missing ${kind} ${value}`);
    return;
  }
  if (
    kind === "social image" &&
    ![".png", ".jpg", ".jpeg", ".webp", ".gif"].includes(
      path.extname(resolved).toLowerCase(),
    )
  ) {
    failures.push(
      `${sourceRelative}: social image should use a shareable raster format: ${value}`,
    );
  }
  if (target.hash && resolved.endsWith(".html")) {
    let fragment;
    try {
      fragment = decodeURIComponent(target.hash.slice(1));
    } catch {
      fragment = target.hash.slice(1);
    }
    if (!idsByFile.get(resolved)?.has(fragment))
      failures.push(`${sourceRelative}: missing anchor ${value}`);
  }
  if (kind === "download" && path.extname(resolved).toLowerCase() === ".pdf") {
    const buffer = await readFile(resolved);
    if (buffer.subarray(0, 5).toString() !== "%PDF-")
      failures.push(`${sourceRelative}: download is not a PDF ${value}`);
  }
}

for (const [file, html] of htmlByFile) {
  if (!/<html\b[^>]*\blang=["']en(?:-[a-z]+)?["']/i.test(html))
    failures.push(`${relativeName(file)}: missing English document language`);
  if (!/<title>[^<]+<\/title>/i.test(html))
    failures.push(`${relativeName(file)}: missing page title`);
  const tags = html.matchAll(/<([a-z][\w:-]*)\b([^>]*?)>/gi);
  let canonical;
  for (const [, tag, attributes] of tags) {
    const parsed = attributesOf(attributes);
    if (tag.toLowerCase() === "link" && parsed.rel === "canonical")
      canonical = parsed.href;
    if (
      tag.toLowerCase() === "meta" &&
      ["og:image", "og:image:url", "twitter:image"].includes(
        parsed.property ?? parsed.name,
      )
    ) {
      await checkReference(parsed.content ?? "", file, "social image");
    }
    if (
      tag.toLowerCase() === "img" &&
      !/\balt=["'][^"']*["']/i.test(attributes)
    )
      failures.push(`${relativeName(file)}: image missing alt attribute`);
    for (const [, attribute, raw] of attributes.matchAll(
      /\b(href|src|poster)=["']([^"']*)["']/gi,
    )) {
      const kind =
        attribute.toLowerCase() === "href" &&
        /\bdownload(?:=|\s|$)/i.test(attributes)
          ? "download"
          : attribute;
      await checkReference(raw, file, kind);
    }
    const srcset = attributes.match(/\bsrcset=["']([^"']*)["']/i)?.[1];
    if (srcset && !srcset.startsWith("data:")) {
      for (const candidate of srcset.split(","))
        await checkReference(candidate.trim().split(/\s+/)[0], file, "srcset");
    }
  }
  if (
    siteOrigin &&
    !/^(?:404(?:\/|\.)|_not-found\/)/.test(relativeName(file))
  ) {
    if (!canonical) {
      failures.push(
        `${relativeName(file)}: missing canonical URL for configured site`,
      );
    } else {
      try {
        const target = new URL(canonical);
        const route = relativeName(file)
          .replace(/(?:^|\/)index\.html$/, "/")
          .replace(/^\//, "");
        const expectedPath = `${basePath}/${route}`;
        if (
          target.origin !== siteOrigin ||
          decodeURIComponent(target.pathname) !== expectedPath ||
          target.search ||
          target.hash
        ) {
          failures.push(
            `${relativeName(file)}: canonical URL must point to ${siteOrigin}${expectedPath}`,
          );
        }
      } catch {
        failures.push(`${relativeName(file)}: canonical URL must be absolute`);
      }
    }
  }
}

for (const cssFile of files.filter((file) => file.endsWith(".css"))) {
  const css = await readFile(cssFile, "utf8");
  for (const match of css.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/g)) {
    await checkReference(match[1], cssFile, "CSS asset");
  }
}

if (failures.length) {
  console.error(
    `Static export verification failed (${failures.length}):\n${[...new Set(failures)].map((message) => `- ${message}`).join("\n")}`,
  );
  process.exit(1);
}
console.log(
  `Verified ${htmlFiles.length} HTML pages and ${checkedReferences} local references at base path ${basePath || "/"}.`,
);
console.log(
  `Found ${externalLinks.size} distinct external URLs; syntax checked only (availability requires browser/network verification).`,
);
