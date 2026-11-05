"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/certification", label: "Certification" },
  { href: "/blog", label: "Blog" },
];

export default function Nav({ name, email }: { name: string; email: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="font-display text-sm tracking-wide uppercase">
          {name}
        </Link>

        <nav className="hidden items-center gap-8 text-sm md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/80 transition hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`mailto:${email}`}
            className="rounded-full border border-foreground px-4 py-1.5 transition hover:bg-foreground hover:text-background"
          >
            Email me
          </a>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`h-px w-5 bg-foreground transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-5 bg-foreground transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-6 pb-6 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 text-base text-foreground/80 transition hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`mailto:${email}`}
            onClick={() => setOpen(false)}
            className="py-3 text-base text-foreground/80 transition hover:text-foreground"
          >
            Email me
          </a>
        </nav>
      )}
    </header>
  );
}
