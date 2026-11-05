import { Profile } from "@/lib/content";

const year = new Date().getFullYear();

export default function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-10">
        <p>
          © {year} {profile.fullName || profile.name}. Built in black &amp; white.
        </p>
        <div className="flex gap-6">
          <a href={`mailto:${profile.email}`} className="transition hover:text-foreground">
            {profile.email}
          </a>
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="transition hover:text-foreground">
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
