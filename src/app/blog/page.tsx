import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog — Anj Temblor",
  description: "Writing from Anj Temblor.",
};

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:px-10">
      <h1 className="font-display text-5xl sm:text-6xl">Blog</h1>
      <p className="mt-4 max-w-xl text-muted">Notes and stories, added here as they're written.</p>

      <div className="mt-14 flex flex-col divide-y divide-border border-t border-border">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-2 py-10 first:pt-0"
          >
            <p className="text-sm text-muted">
              {post.date} · {post.readTime}
            </p>
            <p className="font-display text-2xl group-hover:underline">{post.title}</p>
            <div
              className="prose-body max-w-2xl text-base"
              dangerouslySetInnerHTML={{ __html: post.excerptHtml }}
            />
          </Link>
        ))}
        {posts.length === 0 && <p className="py-10 text-muted">No posts yet — add one in content/blog.md.</p>}
      </div>
    </section>
  );
}
