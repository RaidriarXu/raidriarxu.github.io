import Link from "next/link";
export default function NotFound() {
  return (
    <main tabIndex={-1} id="main" className="container not-found">
      <p className="eyebrow">404 / PAGE NOT FOUND</p>
      <h1>A small detour.</h1>
      <p>This page isn’t here. My work is just one click away.</p>
      <Link href="/" className="button button-dark">
        Back to home <span aria-hidden="true">↗</span>
      </Link>
    </main>
  );
}
