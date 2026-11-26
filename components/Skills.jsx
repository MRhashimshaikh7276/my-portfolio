"use client";

import { motion } from "framer-motion";
import {
  Blocks,
  Braces,
  Database,
  FileCode2,
  Flame,
  GitBranch,
  KeyRound,
  Layers,
  Palette,
  Server,
  Sparkles,
  UploadCloud,
  Workflow,
} from "lucide-react";
import GithubMark from "./icons/GithubMark";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";
import { fadeUp, viewport } from "@/lib/animations";

const categories = [
  {
    title: "Frontend",
    items: [
      { name: "React", icon: Blocks },
      { name: "Next.js", icon: Layers },
      { name: "JavaScript", icon: Braces },
      { name: "TypeScript", icon: FileCode2 },
      { name: "HTML", icon: FileCode2 },
      { name: "CSS", icon: Palette },
      { name: "SCSS", icon: Palette },
      { name: "Tailwind CSS", icon: Sparkles },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", icon: Server },
      { name: "Express.js", icon: Workflow },
      { name: "REST APIs", icon: Braces },
      { name: "JWT", icon: KeyRound },
    ],
  },
  {
    title: "Database",
    items: [
      { name: "MongoDB", icon: Database },
      { name: "Firebase", icon: Flame },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Git", icon: GitBranch },
      { name: "GitHub", icon: GithubMark },
      { name: "Swagger", icon: FileCode2 },
      { name: "WordPress", icon: Layers },
      { name: "Multer", icon: UploadCloud },
    ],
  },
];

const marqueeItems = categories.flatMap((c) => c.items.map((i) => i.name));

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Skills"
          title="Tools I use to ship."
          subtitle="A focused toolkit across the full MERN stack, built for shipping real, production-grade features."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, ci) => (
            <motion.div
              key={category.title}
              custom={ci * 0.08}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <TiltCard
                max={6}
                className="glass group relative overflow-hidden rounded-2xl p-6 transition-colors hover:border-accent/40"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent/0 blur-2xl transition-colors duration-500 group-hover:bg-accent/20" />
                <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                  {category.title}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {category.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li
                        key={item.name}
                        data-cursor="SKILL"
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-foreground/3 px-3 py-1.5 text-xs font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent/10"
                      >
                        <Icon size={13} className="text-accent" aria-hidden="true" />
                        {item.name}
                      </li>
                    );
                  })}
                </ul>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <div className="relative mt-16 overflow-hidden border-y border-border py-6">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-background to-transparent" />
          <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="font-display text-2xl font-medium text-foreground/20 sm:text-3xl"
              >
                {name} <span className="text-accent/40">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
