import { InternalLink } from "./internal-link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner shell">
        <InternalLink className="brand" href="/" aria-label="Neha Mangla, home">
          <span aria-hidden="true">NM</span>
          <span className="brand__name">Neha Mangla</span>
        </InternalLink>

        <nav className="site-nav" aria-label="Primary navigation">
          <InternalLink href="/#work">Work</InternalLink>
          <InternalLink href="/#about">About</InternalLink>
          <InternalLink href="/blog">Engineering Notes</InternalLink>
          <a
            href="https://www.linkedin.com/in/nehamangla/"
            rel="noreferrer"
            target="_blank"
          >
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
