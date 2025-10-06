import yaml from "js-yaml";

/** ---------- FRONTMATTER PARSER ---------- */
function parseFrontmatter(raw) {
  const match = /^---\n([\s\S]*?)\n---/.exec(raw);
  if (!match) return { data: {}, content: raw };
  const data = yaml.load(match[1]);
  const content = raw.slice(match[0].length).trim();
  return { data, content };
}

/** ---------- CONFIG ---------- */
const FOLDERS = ["SystemDesign", "GenAI", "DSA"];

/** ---------- GET ALL POSTS ---------- */
export async function getPosts() {
  const postFiles = import.meta.glob("../posts/**/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
  });

  const posts = [];

  for (const path in postFiles) {
    const file = postFiles[path];
    const { data, content } = parseFrontmatter(file);

    const parts = path.split("/");
    const folder = parts[parts.length - 2];
    const category = folder.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

    posts.push({
      slug: parts.pop().replace(".md", ""),
      category,
      ...data,
      content,
    });
  }

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/** ---------- GET SINGLE POST ---------- */
export async function getPostBySlug(slug) {
  const postFiles = import.meta.glob("../posts/**/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
  });

  for (const path in postFiles) {
    if (path.endsWith(`${slug}.md`)) {
      const file = postFiles[path];
      const { data, content } = parseFrontmatter(file);
      const parts = path.split("/");
      const folder = parts[parts.length - 2];
      const category = folder.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      return { category, ...data, content };
    }
  }

  throw new Error(`Post not found: ${slug}`);
}
