import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/content";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return { title: `${post.title} — Anj Temblor`, description: post.title };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-20 md:px-10">
      <Link href="/blog" className="text-sm text-muted underline underline-offset-4">
        ← Back to blog
      </Link>
      <p className="mt-8 text-sm text-muted">
        {post.date} · {post.readTime}
      </p>
      <h1 className="font-display mt-3 text-4xl sm:text-5xl">{post.title}</h1>
      <div
        className="prose-body mt-8 text-lg leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.excerptHtml }}
      />
      {post.link && (
        <a
          href={post.link}
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-block rounded-full border border-foreground px-5 py-2 text-sm transition hover:bg-foreground hover:text-background"
        >
          Read the full article ↗
        </a>
      )}
    </article>
  );
}
