export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(
  /\/$/,
  "",
);

/** Next Link handles its own basePath. Use this for plain anchors and public assets. */
export function assetPath(path: string): string {
  return /^(https?:|mailto:|data:|#)/.test(path)
    ? path
    : `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

export function absoluteUrl(path: string): string | undefined {
  const origin = process.env.NEXT_PUBLIC_SITE_URL;
  return origin ? new URL(assetPath(path), origin).toString() : undefined;
}
