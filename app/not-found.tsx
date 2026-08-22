import { InternalLink } from "@/components/internal-link";

export default function NotFound() {
  return (
    <main className="system-page shell">
      <p className="eyebrow">404 · Page not found</p>
      <h1>Page not found.</h1>
      <p>
        The address may have changed, or this project is not published.
      </p>
      <InternalLink className="button-link" href="/">
        Return to selected work
      </InternalLink>
    </main>
  );
}
