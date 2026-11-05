import type { Metadata } from "next";
import { getCertifications } from "@/lib/content";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Certification — Anj Temblor",
  description: "Certifications and credentials.",
};

export default async function CertificationPage() {
  const certifications = await getCertifications();

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:px-10">
      <Reveal>
        <h1 className="font-display text-5xl sm:text-6xl">Certification</h1>
        <p className="mt-4 max-w-xl text-muted">Credentials and formal training, kept up to date here.</p>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, i) => (
          <Reveal
            key={cert.slug}
            delay={i * 90}
            className="hover-lift flex flex-col gap-3 rounded-2xl border border-border p-7 hover:border-foreground/40"
          >
            <p className="font-display text-xl">{cert.title}</p>
            <p className="text-sm text-muted">{cert.issuer}</p>
            <p className="text-sm text-muted">{cert.date}</p>
            {cert.credential && (
              <p className="text-xs uppercase tracking-wide text-muted">Credential ID {cert.credential}</p>
            )}
            {cert.bodyHtml && (
              <div className="prose-body text-sm" dangerouslySetInnerHTML={{ __html: cert.bodyHtml }} />
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
