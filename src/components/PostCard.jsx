import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  const readingTime = Math.ceil(post.content.split(/\s+/).length / 200);

  return (
    <Link
      to={`/post/${post.slug}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-2xl"
    >
      <article
        className={`
          relative flex flex-col justify-between h-full
          bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm
          border border-neutral-200/60 dark:border-neutral-800/60
          rounded-2xl p-6
          shadow-[0_1px_2px_rgba(0,0,0,0.05)]
          hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)]
          hover:-translate-y-[6px]
          transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          overflow-hidden
        `}
      >
        {/* ---------- Hover Gradient Border Glow ---------- */}
        <div
          className="
            absolute inset-0 rounded-2xl 
            opacity-0 group-hover:opacity-100 transition-opacity duration-500
            bg-[linear-gradient(120deg,#4285F4_0%,#34A853_25%,#FBBC05_60%,#EA4335_100%)]
            bg-[length:400%_400%]
            animate-[gradientShift_6s_ease_infinite]
            pointer-events-none
          "
          style={{ mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor" }}
        />

        {/* ---------- Header ---------- */}
        <header className="mb-4 relative z-10">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-neutral-500 dark:text-neutral-400 tracking-wide uppercase">
              {post.category?.replace("-", " ")}
            </p>
            <span className="text-xs text-neutral-400 dark:text-neutral-500">
              {readingTime} min read
            </span>
          </div>

          <h2
            className="
              text-[1.25rem] font-semibold leading-snug
              text-neutral-900 dark:text-neutral-100
              group-hover:text-primary
              transition-colors duration-200
            "
          >
            {post.title}
          </h2>

          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {format(new Date(post.date), "PPP")}
          </p>
        </header>

        {/* ---------- Summary ---------- */}
        <p
          className="
            relative z-10 text-neutral-700 dark:text-neutral-400 
            mb-6 line-clamp-3 leading-relaxed transition-colors duration-300
          "
        >
          {post.summary}
        </p>

        {/* ---------- Footer ---------- */}
        <footer className="relative z-10 mt-auto flex items-center justify-between text-sm">
          <span
            className="
              inline-flex items-center font-medium text-primary
              group-hover:underline underline-offset-4
              transition-all duration-200
            "
          >
            Read more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>

          {/* Date pill */}
          <span
            className="
              px-2.5 py-0.5 rounded-full text-xs font-medium
              bg-primary/10 text-primary dark:bg-primary/20
              group-hover:bg-primary/20 transition-colors
            "
          >
            {format(new Date(post.date), "MMM d")}
          </span>
        </footer>
      </article>
    </Link>
  );
}
