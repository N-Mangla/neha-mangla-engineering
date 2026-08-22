"use client";

import { useEffect } from "react";
import { InternalLink } from "@/components/internal-link";

interface ErrorPageProps {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Portfolio route failed to render", error);
  }, [error]);

  return (
    <main className="system-page shell">
      <p className="eyebrow">Something went wrong</p>
      <h1>The page could not be loaded.</h1>
      <p>
        Try again, or return to the work gallery.
      </p>
      <div className="system-page__actions">
        <button className="button-link" type="button" onClick={reset}>
          Try again
        </button>
        <InternalLink className="text-link" href="/">
          Return home
        </InternalLink>
      </div>
    </main>
  );
}
