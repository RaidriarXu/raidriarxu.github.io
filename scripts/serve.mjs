import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const outputRoot = path.resolve("out");
const arg = (name) => {
  const index = process.argv.indexOf(name);
  return index < 0 ? undefined : process.argv[index + 1];
};
let indexHtml;
try {
  indexHtml = await readFile(path.join(outputRoot, "index.html"), "utf8");
} catch {
  console.error("No static export found. Run npm run build first.");
  process.exit(1);
}
const inferredBasePath =
  indexHtml.match(/(?:src|href)=["']([^"']*?)\/_next\//)?.[1] ?? "";
const basePath = (
  arg("--base-path") ??
  process.env.NEXT_PUBLIC_BASE_PATH ??
  inferredBasePath
).replace(/\/$/, "");
const port = Number(arg("--port") ?? process.env.PORT ?? 3000);
if (
  !Number.isInteger(port) ||
  port < 1 ||
  port > 65535 ||
  (basePath && !basePath.startsWith("/"))
) {
  throw new Error("Use a valid --port and a base path such as /portfolio.");
}

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".pdf": "application/pdf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".xml": "application/xml; charset=utf-8",
};

async function notFound(response, head) {
  response.writeHead(404, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store",
  });
  const body = await readFile(path.join(outputRoot, "404.html")).catch(() =>
    Buffer.from("Not found"),
  );
  response.end(head ? undefined : body);
}

const server = createServer(async (request, response) => {
  const head = request.method === "HEAD";
  if (request.method !== "GET" && !head) {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end();
    return;
  }
  try {
    const url = new URL(request.url ?? "/", "http://localhost");
    const pathname = decodeURIComponent(url.pathname);
    if (basePath && pathname === "/") {
      response.writeHead(302, { Location: `${basePath}/` });
      response.end();
      return;
    }
    if (
      basePath &&
      pathname !== basePath &&
      !pathname.startsWith(`${basePath}/`)
    ) {
      await notFound(response, head);
      return;
    }
    const relative = pathname.slice(basePath.length).replace(/^\/+/, "");
    let filePath = path.resolve(outputRoot, relative);
    if (
      relative.includes("\0") ||
      relative.includes("\\") ||
      (filePath !== outputRoot && !filePath.startsWith(outputRoot + path.sep))
    ) {
      response.writeHead(400);
      response.end("Invalid path");
      return;
    }
    let fileStat = await stat(filePath).catch(() => null);
    if (fileStat?.isDirectory()) {
      if (!pathname.endsWith("/")) {
        response.writeHead(308, { Location: `${url.pathname}/${url.search}` });
        response.end();
        return;
      }
      filePath = path.join(filePath, "index.html");
      fileStat = await stat(filePath).catch(() => null);
    }
    if (!fileStat?.isFile()) {
      await notFound(response, head);
      return;
    }
    response.writeHead(200, {
      "Content-Type":
        types[path.extname(filePath)] ?? "application/octet-stream",
      "Content-Length": fileStat.size,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(head ? undefined : await readFile(filePath));
  } catch (error) {
    response.writeHead(error instanceof URIError ? 400 : 500);
    response.end("Unable to serve this request");
  }
});

server.on("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
server.listen(port, "127.0.0.1", () => {
  console.log(`Static preview: http://127.0.0.1:${port}${basePath}/`);
  console.log("Serving the exported out/ folder. Press Ctrl+C to stop.");
});
