import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getPostBySlug, getPosts } from "../utils/posts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark-dimmed.css";
import { motion, useScroll, useSpring, useTransform, useInView } from "framer-motion";

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [headings, setHeadings] = useState([]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });
  const progressPercent = useTransform(scrollYProgress, (v) => Math.round(v * 100));

  useEffect(() => {
    (async () => {
      const current = await getPostBySlug(slug);
      setPost(current);

      const hMatches = Array.from(current.content.matchAll(/^##?\s+(.*)$/gm));
      const parsed = hMatches.map((m) => {
        const text = m[1].trim();
        const level = m[0].startsWith("##") ? 3 : 2;
        const id = text.toLowerCase().replace(/[^\w]+/g, "-").replace(/^-|-$/g, "");
        return { text, level, id };
      });
      setHeadings(parsed);

      // ---- Related posts logic ----
      const allPosts = await getPosts();
      const related = allPosts
        .filter(
          (p) =>
            p.slug !== slug &&
            (p.category === current.category ||
              current.tags?.some((tag) => p.tags?.includes(tag)))
        )
        .slice(0, 3);
      setRelatedPosts(related);
    })();
  }, [slug]);

  if (!post)
    return (
      <div className="min-h-screen flex items-center justify-center text-neutral-500 dark:text-neutral-400 animate-pulse">
        Loading article…
      </div>
    );

  const readingTime = Math.ceil(post.content.split(/\s+/).length / 200);

  return (
    <main className="min-h-screen bg-gradient-to-b from-surface-light via-white to-surface-light dark:from-surface-dark dark:via-neutral-900 dark:to-surface-dark transition-colors duration-700">
      {/* ---------- Reading progress bar ---------- */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50" style={{ scaleX }} />

      {/* Floating read progress badge */}
      <motion.div
        className="fixed bottom-8 right-8 z-50 bg-neutral-900/80 dark:bg-white/10 backdrop-blur-md text-white dark:text-neutral-200 text-sm font-medium px-4 py-2 rounded-full shadow-lg border border-neutral-700/40 select-none"
        style={{ opacity: scrollYProgress }}
      >
        <motion.span>{progressPercent}</motion.span>% read
      </motion.div>

      {/* ---------- Header ---------- */}
      <section className="max-w-4xl mx-auto px-6 sm:px-10 pt-28 pb-8 text-center">
        <motion.h1
          className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4 leading-snug"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {post.title}
        </motion.h1>

        <motion.p
          className="text-sm text-neutral-600 dark:text-neutral-400 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          • {readingTime} min read
        </motion.p>
      </section>

      {/* ---------- Main Article Layout ---------- */}
      <section className="py-16 px-4 sm:px-8 flex justify-center">
        <div className="relative w-full max-w-6xl flex gap-12">
          {/* ---------- Main Content ---------- */}
          <div className="relative flex-1 bg-white dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/60 rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_rgba(255,255,255,0.05)] p-10 sm:p-14 lg:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-40 pointer-events-none rounded-3xl" />

            <article className="relative z-10 max-w-3xl mx-auto prose prose-lg md:prose-xl dark:prose-invert prose-headings:font-display prose-img:rounded-2xl prose-pre:rounded-2xl prose-pre:shadow-lg prose-code:font-mono prose-code:text-primary prose-code:bg-primary/5 prose-a:font-medium prose-a:no-underline prose-a:text-primary hover:prose-a:text-primary/80 leading-relaxed text-justify">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h2: ({ node, children, ...props }) => {
                    const id = children
                      .toString()
                      .toLowerCase()
                      .replace(/[^\w]+/g, "-")
                      .replace(/^-|-$/g, "");
                    const ref = useRef(null);
                    const isInView = useInView(ref, { once: false, margin: "-100px" });

                    return (
                      <motion.h2
                        ref={ref}
                        id={id}
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: isInView ? 1 : 0.7 }}
                        transition={{ duration: 0.3 }}
                        className="scroll-mt-24 relative"
                        {...props}
                      >
                        {children}
                        <span className="absolute left-0 bottom-0 w-10 h-[2px] bg-primary/60 rounded-full" />
                      </motion.h2>
                    );
                  },
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    const language = match ? match[1].toUpperCase() : "CODE";
                    if (inline) {
                      return (
                        <code
                          className="px-1.5 py-0.5 rounded-md bg-primary/5 text-primary text-[0.9em] font-medium"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    }
                    const codeRef = useRef(null);
                    const handleCopy = () => {
                      navigator.clipboard.writeText(children);
                      const el = codeRef.current;
                      el.textContent = "Copied!";
                      setTimeout(() => (el.textContent = "Copy"), 1200);
                    };
                    return (
                      <div className="relative group mt-6 mb-6">
                        <div className="absolute top-2 right-3 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs text-neutral-400 dark:text-neutral-500">{language}</span>
                          <button
                            ref={codeRef}
                            onClick={handleCopy}
                            className="text-xs bg-neutral-800/70 dark:bg-white/10 text-white px-2 py-1 rounded-md hover:bg-primary/80 transition"
                          >
                            Copy
                          </button>
                        </div>
                        <pre className="relative rounded-xl overflow-hidden bg-[#0d1117] text-neutral-100 p-5 leading-relaxed font-mono text-[0.95em] shadow-inner border border-neutral-800/40">
                          <code className={className} {...props}>
                            {children}
                          </code>
                        </pre>
                      </div>
                    );
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </article>

            {/* ---------- Author Footer ---------- */}
            <div className="mt-20 pt-10 border-t border-neutral-200/70 dark:border-neutral-800/70 text-center text-sm text-neutral-600 dark:text-neutral-400">
              <p className="leading-relaxed">
                ✍️ Written by <span className="text-primary font-semibold">Tejas Sathe</span>
              </p>
              <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500 tracking-wide">
                Exploring System Design, GenAI, and the craft of scalable engineering.
              </p>
            </div>

            {/* ---------- Related Posts Section ---------- */}
            {relatedPosts.length > 0 && (
              <section className="mt-24 pt-10 border-t border-neutral-200/60 dark:border-neutral-800/60">
                <h3 className="text-xl font-display font-semibold mb-8 text-neutral-900 dark:text-neutral-100">
                  Continue Reading
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedPosts.map((p, i) => (
                    <motion.div
                      key={p.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Link
                        to={`/post/${p.slug}`}
                        className="group block rounded-2xl border border-neutral-200/50 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                      >
                        <div className="text-xs text-primary font-medium mb-1">
                          {p.category || p.tags?.[0] || "Article"}
                        </div>
                        <h4 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-primary transition">
                          {p.title}
                        </h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 line-clamp-2">
                          {p.summary}
                        </p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Glow effect */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
          </div>

          {/* ---------- Static TOC ---------- */}
          <aside className="hidden lg:block w-64 sticky top-28 self-start">
            <div className="border-l border-neutral-200 dark:border-neutral-800 pl-5 space-y-2 text-sm">
              <p className="text-xs uppercase tracking-wide text-neutral-400 dark:text-neutral-500 mb-2">
                On this page
              </p>
              {headings.map((h) => (
                <div
                  key={h.id}
                  className={`text-neutral-600 dark:text-neutral-400 ${
                    h.level === 2 ? "ml-1 font-semibold" : "ml-4 text-xs"
                  }`}
                >
                  {h.text}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}


// useEffect(() => {
//     getPosts().then((data) => {
//       console.log("🔍 All posts:", data);
//       console.log("🌐 Current category from URL:", category);
//       const filtered = data.filter((p) => p.category === category);
//       console.log("✅ Filtered posts:", filtered);
//       setPosts(filtered);
//     });
//   }, [category]);