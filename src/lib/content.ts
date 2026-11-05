import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

const CONTENT_DIR = path.join(process.cwd(), "content");

type ContentRecord = {
  title: string;
  fields: FieldMap;
  body: string;
  order: number;
};

type FieldMap = { [key: string]: string };

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Parses the house content format: a "## Title" heading starts a record,
 * "Key: value" lines (until the first blank line) are its fields, and
 * everything after that blank line up to the next "## " is the body.
 */
function parseRecords(raw: string): ContentRecord[] {
  const withoutComments = raw.replace(/<!--[\s\S]*?-->/g, "");
  const blocks = withoutComments.split(/\n(?=## )/g).map((b) => b.trim());

  const records: ContentRecord[] = [];

  for (const block of blocks) {
    if (!block.startsWith("## ")) continue;

    const lines = block.split("\n");
    const title = lines[0].replace(/^##\s*/, "").trim();
    const fields: FieldMap = {};

    let i = 1;
    for (; i < lines.length; i++) {
      const line = lines[i];
      const match = line.match(/^([A-Za-z]+):\s?(.*)$/);
      if (!match) break;
      fields[match[1]] = match[2].trim();
    }

    while (i < lines.length && lines[i].trim() === "") i++;
    const body = lines.slice(i).join("\n").trim();

    records.push({
      title,
      fields,
      body,
      order: fields.Order ? parseInt(fields.Order, 10) : 999,
    });
  }

  return records.sort((a, b) => a.order - b.order);
}

function readContentFile(filename: string): string {
  return fs.readFileSync(path.join(CONTENT_DIR, filename), "utf8");
}

async function markdownToHtml(markdown: string): Promise<string> {
  if (!markdown) return "";
  const processed = await remark().use(html).process(markdown);
  return processed.toString();
}

export type Profile = {
  name: string;
  fullName: string;
  title: string;
  subtitle: string;
  location: string;
  email: string;
  linkedin: string;
  photo: string;
  bio: string;
};

export function getProfile(): Profile {
  const raw = readContentFile("profile.md").replace(/<!--[\s\S]*?-->/g, "").trim();
  const lines = raw.split("\n");
  const fields: FieldMap = {};
  let i = 0;
  for (; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/^([A-Za-z]+):\s?(.*)$/);
    if (!match) break;
    fields[match[1]] = match[2].trim();
  }
  while (i < lines.length && lines[i].trim() === "") i++;
  const bio = lines.slice(i).join("\n").trim();

  return {
    name: fields.Name ?? "",
    fullName: fields.FullName ?? "",
    title: fields.Title ?? "",
    subtitle: fields.Subtitle ?? "",
    location: fields.Location ?? "",
    email: fields.Email ?? "",
    linkedin: fields.LinkedIn ?? "",
    photo: fields.Photo ?? "",
    bio,
  };
}

export type PortfolioItem = {
  slug: string;
  role: string;
  company: string;
  period: string;
  location: string;
  tag: string;
  bodyHtml: string;
};

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const records = parseRecords(readContentFile("portfolio.md"));
  return Promise.all(
    records.map(async (r) => ({
      slug: slugify(`${r.title}-${r.fields.Company ?? ""}`),
      role: r.title,
      company: r.fields.Company ?? "",
      period: r.fields.Period ?? "",
      location: r.fields.Location ?? "",
      tag: r.fields.Tag ?? "",
      bodyHtml: await markdownToHtml(r.body),
    }))
  );
}

export type Certification = {
  slug: string;
  title: string;
  issuer: string;
  date: string;
  credential: string;
  bodyHtml: string;
};

export async function getCertifications(): Promise<Certification[]> {
  const records = parseRecords(readContentFile("certifications.md"));
  return Promise.all(
    records.map(async (r) => ({
      slug: slugify(r.title),
      title: r.title,
      issuer: r.fields.Issuer ?? "",
      date: r.fields.Date ?? "",
      credential: r.fields.Credential ?? "",
      bodyHtml: await markdownToHtml(r.body),
    }))
  );
}

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  link: string;
  excerptHtml: string;
};

export async function getBlogPosts(): Promise<BlogPost[]> {
  const records = parseRecords(readContentFile("blog.md"));
  return Promise.all(
    records.map(async (r) => ({
      slug: slugify(r.title),
      title: r.title,
      date: r.fields.Date ?? "",
      readTime: r.fields.ReadTime ?? "",
      link: r.fields.Link ?? "",
      excerptHtml: await markdownToHtml(r.body),
    }))
  );
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug);
}
