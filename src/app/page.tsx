import Link from "next/link";
import Image from "next/image";
import { getProfile, getPortfolioItems, getCertifications, getBlogPosts } from "@/lib/content";
import Reveal from "@/components/Reveal";

export default async function Home() {
  const profile = getProfile();
  const portfolio = await getPortfolioItems();
  const certifications = await getCertifications();
  const posts = await getBlogPosts();

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-24 md:px-10 md:pt-28 md:pb-32">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:items-end">
          <h1 className="hero-in font-display text-[14vw] leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
            Digital
            <br />
            Marketing
            <br />
            &amp; Web Craft
          </h1>
          <div className="hero-in flex flex-col gap-6" style={{ animationDelay: "150ms" }}>
            <p className="font-display text-3xl text-muted sm:text-4xl">by {profile.name}</p>
            <p className="max-w-sm text-muted">{profile.title} — {profile.subtitle}. Based in {profile.location}.</p>
            <div className="flex flex-wrap gap-3 text-sm">
              <a
                href={`mailto:${profile.email}`}
                className="hover-lift rounded-full border border-foreground px-5 py-2 transition-colors hover:bg-foreground hover:text-background"
              >
                Email me
              </a>
              <Link
                href="#work"
                className="hover-lift rounded-full border border-border px-5 py-2 text-muted transition-colors hover:border-foreground hover:text-foreground"
              >
                See the work ↓
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 md:px-10 lg:grid-cols-4">
          {portfolio.slice(0, 4).map((item, i) => (
            <Reveal key={item.slug} delay={i * 90} className="flex flex-col gap-3">
              <span className="w-fit rounded-full border border-border px-3 py-1 text-xs uppercase tracking-wide text-muted">
                At {item.company}
              </span>
              <p className="text-sm text-foreground/90">{item.role}</p>
              <p className="text-sm text-muted">{item.period}</p>
              <a href="#work" className="link-sweep w-fit text-sm">
                Jump to overview ↓
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Work */}
      <section id="work" className="scroll-mt-20 border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
          <Reveal>
            <h2 className="font-display text-4xl sm:text-5xl">Work</h2>
            <p className="mt-4 max-w-xl text-muted">
              A record of roles across digital marketing, web implementation, and the path that led there.
            </p>
          </Reveal>

          <div className="mt-14 flex flex-col divide-y divide-border border-t border-border">
            {portfolio.map((item, i) => (
              <Reveal
                key={item.slug}
                as="article"
                delay={Math.min(i, 4) * 70}
                className="grid gap-6 py-10 md:grid-cols-[1fr_2fr]"
              >
                <div className="flex flex-col gap-2">
                  <span className="w-fit rounded-full border border-border px-3 py-1 text-xs uppercase tracking-wide text-muted">
                    {item.tag}
                  </span>
                  <h3 className="font-display text-xl">{item.role}</h3>
                  <p className="text-muted">{item.company}</p>
                  <p className="text-sm text-muted">{item.period}</p>
                  <p className="text-sm text-muted">{item.location}</p>
                </div>
                <div
                  className="prose-body max-w-2xl text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.bodyHtml }}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certification teaser */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-4xl sm:text-5xl">Certification</h2>
            <Link href="/certification" className="link-sweep text-sm">
              View all →
            </Link>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.slice(0, 3).map((cert, i) => (
              <Reveal
                key={cert.slug}
                delay={i * 90}
                className="hover-lift rounded-2xl border border-border p-6 hover:border-foreground/40"
              >
                <p className="font-display text-lg">{cert.title}</p>
                <p className="mt-2 text-sm text-muted">{cert.issuer}</p>
                <p className="mt-1 text-sm text-muted">{cert.date}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Blog teaser */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-4xl sm:text-5xl">Blog</h2>
            <Link href="/blog" className="link-sweep text-sm">
              View all →
            </Link>
          </Reveal>
          <div className="mt-10 flex flex-col gap-8">
            {posts.slice(0, 3).map((post, i) => (
              <Reveal key={post.slug} delay={i * 90}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-2 border-b border-border pb-8 last:border-none"
                >
                  <p className="text-sm text-muted">
                    {post.date} · {post.readTime}
                  </p>
                  <p className="font-display text-xl transition-colors group-hover:text-foreground group-hover:underline">
                    {post.title}
                  </p>
                  <div
                    className="prose-body max-w-2xl text-sm"
                    dangerouslySetInnerHTML={{ __html: post.excerptHtml }}
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About / contact */}
      <section className="border-t border-border">
        <Reveal
          as="div"
          className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[auto_1fr] md:items-center md:px-10"
        >
          {profile.photo && (
            <Image
              src={profile.photo}
              alt={profile.fullName || profile.name}
              width={160}
              height={160}
              className="h-40 w-40 rounded-full border border-border object-cover grayscale"
            />
          )}
          <div className="max-w-2xl">
            <p className="text-lg leading-relaxed text-muted">{profile.bio}</p>
            <a
              href={`mailto:${profile.email}`}
              className="hover-lift mt-6 inline-block rounded-full border border-foreground px-5 py-2 text-sm transition-colors hover:bg-foreground hover:text-background"
            >
              Say hello — {profile.email}
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
