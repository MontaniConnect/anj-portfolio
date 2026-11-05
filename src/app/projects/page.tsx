import type { Metadata } from "next";
import { getProjects } from "@/lib/content";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Projects — Anj Temblor",
  description: "Selected projects — digital marketing, web implementation, and personal builds.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:px-10">
      <Reveal>
        <h1 className="font-display text-5xl sm:text-6xl">Projects</h1>
        <p className="mt-4 max-w-xl text-muted">Selected work — client builds, campaigns, and a side project or two.</p>
      </Reveal>

      <div className="mt-14 flex flex-col divide-y divide-border border-t border-border">
        {projects.map((project, i) => (
          <Reveal
            key={project.slug}
            as="article"
            delay={Math.min(i, 4) * 70}
            className="grid gap-6 py-10 md:grid-cols-[1fr_2fr]"
          >
            <div className="flex flex-col gap-2">
              <span className="w-fit rounded-full border border-border px-3 py-1 text-xs uppercase tracking-wide text-muted">
                {project.tag}
              </span>
              <h2 className="font-display text-xl">{project.title}</h2>
              <p className="text-muted">{project.role}</p>
              <p className="text-sm text-muted">{project.period}</p>
              {project.stack && <p className="text-sm text-muted">{project.stack}</p>}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="link-sweep w-fit text-sm text-foreground"
                >
                  View project ↗
                </a>
              )}
            </div>
            <div
              className="prose-body max-w-2xl text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: project.bodyHtml }}
            />
          </Reveal>
        ))}
        {projects.length === 0 && <p className="py-10 text-muted">No projects yet — add one in content/projects.md.</p>}
      </div>
    </section>
  );
}
