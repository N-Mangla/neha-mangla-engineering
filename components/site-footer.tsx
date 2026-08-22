import { InternalLink } from "./internal-link";

const EMAIL_ADDRESS = "nehamangla500@gmail.com";
const EMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL_ADDRESS)}`;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner shell">
        <div>
          <p className="eyebrow eyebrow--light">Let&apos;s work together</p>
          <p className="site-footer__title">
            I&apos;m open to Senior Full Stack Engineer opportunities where product
            complexity, technical judgment, and production ownership matter.
          </p>
        </div>

        <a
          aria-label={`Email ${EMAIL_ADDRESS}`}
          className="site-footer__email"
          href={EMAIL_COMPOSE_URL}
          rel="noreferrer"
          target="_blank"
        >
          <span>{EMAIL_ADDRESS}</span>
          <span className="site-footer__email-icon" aria-hidden="true">↗</span>
        </a>

        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} Neha Mangla</p>
          <div>
            <InternalLink href="/#work">Work</InternalLink>
            <a
              href="https://github.com/N-Mangla"
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/nehamangla/"
              rel="noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
