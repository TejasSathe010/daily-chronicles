import { motion } from "framer-motion";

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-surface-light via-white to-surface-light dark:from-surface-dark dark:via-neutral-900 dark:to-surface-dark transition-colors duration-700">
      {/* ---------- Header Section ---------- */}
      <section className="relative overflow-hidden text-center pt-28 pb-16">
        {/* Soft radial background accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(66,133,244,0.06),transparent_60%),_radial-gradient(ellipse_at_bottom_left,_rgba(52,168,83,0.06),transparent_60%)] pointer-events-none" />

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-4xl sm:text-5xl font-display font-extrabold tracking-tight
                     bg-gradient-to-r from-[#4285F4] via-[#34A853] via-40% via-[#FBBC05] to-[#EA4335]
                     bg-clip-text text-transparent animate-gradient-x"
        >
          About Daily Tech Chronicles
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative z-10 mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-neutral-600 dark:text-neutral-400"
        >
          A personal space by <strong>Tejas Sathe</strong> — documenting the daily journey through{" "}
          <strong>System Design</strong>, <strong>GenAI</strong>, <strong>Architecture</strong>, and{" "}
          <strong>DSA</strong>.
        </motion.p>
      </section>

      {/* ---------- Body Section ---------- */}
      <section className="max-w-4xl mx-auto px-6 sm:px-10 py-12 text-left text-neutral-700 dark:text-neutral-300">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="prose prose-lg dark:prose-invert prose-headings:font-display prose-headings:tracking-tight max-w-none"
        >
          <p>
            <strong>Daily Tech Chronicles</strong> was born out of a need to simplify complex technical concepts
            and document real engineering learnings. It’s a place where ideas meet implementation — bridging
            theory with production-grade systems.
          </p>

          <p>
            Each post dives deep into topics like distributed system patterns, LLM integrations, scalable API
            design, and advanced DSA — drawn from hands-on work with enterprise systems and GenAI platforms.
          </p>

          <p>
            The goal is to make this blog a living notebook of everything I’m learning — concise, visual, and
            approachable for engineers at any level who want to build intelligent, performant, and elegant
            systems.
          </p>

          <blockquote className="border-l-4 border-primary bg-primary/5 dark:bg-primary/10 rounded-lg px-5 py-4 not-italic text-neutral-700 dark:text-neutral-300">
            “Architecture is the art of finding simplicity in complexity.”  
            <br />
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              — A principle I strive to follow in every system I design.
            </span>
          </blockquote>

          <h2 className="text-2xl font-semibold mt-12 mb-4">What You’ll Find Here</h2>
          <ul className="grid sm:grid-cols-2 gap-2 list-none pl-0">
            <li>📘 Deep dives into <strong>Google-scale System Design</strong></li>
            <li>🧠 Tutorials on <strong>LLMs, RAG, and GenAI frameworks</strong></li>
            <li>⚙️ Hands-on <strong>code walkthroughs and architecture examples</strong></li>
            <li>🧩 Analysis of <strong>real-world distributed patterns</strong></li>
            <li>📈 Intuitive explanations of <strong>DSA techniques</strong></li>
            <li>💬 Reflections on <strong>engineering culture and design thinking</strong></li>
          </ul>

          <h2 className="text-2xl font-semibold mt-12 mb-4">About Me</h2>
          <p>
            I’m <strong>Tejas Sathe</strong> — a software developer and system design enthusiast passionate about
            building reliable, scalable, and intelligent systems. I’ve worked across cloud, AI, and distributed
            architectures, exploring how theory transforms into real-world applications.
          </p>

          <p>
            Beyond code, I enjoy contributing to open-source communities, mentoring developers, and continuously
            learning about how great products are designed and scaled.
          </p>

          <p>
            If something here inspires you, or if you’d like to collaborate, connect with me on{" "}
            <a
              href="https://github.com/tejassathe010"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline font-medium"
            >
              GitHub
            </a>{" "}
            or{" "}
            <a
              href="https://www.linkedin.com/in/tejas-sathe010/"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline font-medium"
            >
              LinkedIn
            </a>
            .
          </p>
        </motion.div>
      </section>
    </main>
  );
}
