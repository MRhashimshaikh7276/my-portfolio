import GithubMark from "./icons/GithubMark";

export default function Footer() {
  return (
    <footer className="relative border-t border-border px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-display text-lg font-semibold tracking-tight text-foreground">
            HASHIM.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Full Stack Developer
          </p>
        </div>

        <a
          href="https://github.com/MRhashimshaikh"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="VIEW"
          aria-label="GitHub profile"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-foreground/5"
        >
          <GithubMark size={16} />
        </a>

        <p className="text-xs text-muted">
          © 2026 Hashim Shaikh. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
