"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springX = useSpring(rotX, { stiffness: 150, damping: 18 });
  const springY = useSpring(rotY, { stiffness: 150, damping: 18 });
  const spotlightX = useMotionValue("50%");
  const spotlightY = useMotionValue("50%");

  const handleMouseMove = (event) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotY.set(px * 6);
    rotX.set(py * -6);
    spotlightX.set(`${(px + 0.5) * 100}%`);
    spotlightY.set(`${(py + 0.5) * 100}%`);
  };

  const handleMouseLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

  const reverse = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 80, clipPath: "inset(8% 8% 8% 8% round 24px)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 24px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`grid items-center gap-8 lg:grid-cols-12 lg:gap-6 ${
        reverse ? "" : ""
      }`}
    >
      <a
        ref={ref}
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="OPEN PROJECT"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: 1000 }}
        className={`group relative block aspect-4/3 overflow-hidden rounded-3xl border border-border sm:aspect-16/10 ${
          reverse ? "lg:order-2 lg:col-span-7" : "lg:col-span-7"
        }`}
      >
        <motion.div
          style={{ rotateX: springX, rotateY: springY }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
            style={{ background: project.gradient }}
          />
          <div className={`absolute inset-0 bg-linear-to-br ${project.accent}`} />
          <div className="grid-bg absolute inset-0 opacity-40" />

          {/* Mouse-follow spotlight/glare */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              backgroundImage:
                "radial-gradient(circle at var(--spot-x) var(--spot-y), rgba(255,255,255,0.22), transparent 55%)",
              "--spot-x": spotlightX,
              "--spot-y": spotlightY,
            }}
          />

          <div className="absolute inset-0 flex items-end justify-between p-6 sm:p-8">
            <span className="font-display text-6xl font-bold text-white/10 sm:text-8xl">
              {project.number}
            </span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/30 backdrop-blur transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight size={18} className="text-white" />
            </span>
          </div>
        </motion.div>

        {/* Curtain reveal mask */}
        <motion.div
          aria-hidden="true"
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
          style={{ transformOrigin: "top" }}
          className="pointer-events-none absolute inset-0 z-10 bg-background"
        />
      </a>

      <div className={reverse ? "lg:order-1 lg:col-span-5" : "lg:col-span-5"}>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          {project.category}
        </p>
        <h3 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
          {project.name}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
          {project.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border bg-foreground/3 px-3 py-1 text-xs font-medium text-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>

        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="VIEW"
          className="mt-7 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-foreground/5"
        >
          Visit Live Site
          <ArrowUpRight size={14} />
        </a>
      </div>
    </motion.article>
  );
}
