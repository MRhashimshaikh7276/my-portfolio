"use client";

import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";
import { fadeUp, viewport } from "@/lib/animations";

const education = [
  {
    degree: "Full Stack Development",
    school: "Treemiti Informatics, Nashik",
    period: null,
  },
  {
    degree: "12th Science",
    school: "Kalpataru Kanishtha Mahavidyalaya",
    period: "2019 – 2020",
  },
];

export default function Education() {
  return (
    <section id="education" className="relative px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Education" title="Where it started." />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {education.map((item, i) => (
            <motion.div
              key={item.degree}
              custom={i * 0.1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <TiltCard max={5}>
                <div className="group relative h-full overflow-hidden rounded-2xl glass p-8 transition-colors hover:border-accent/40">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/0 blur-2xl transition-colors duration-500 group-hover:bg-accent/20" />
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-accent">
                    <GraduationCap size={18} aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold text-foreground sm:text-2xl">
                    {item.degree}
                  </h3>
                  <p className="mt-2 text-sm text-muted sm:text-base">{item.school}</p>
                  {item.period && (
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                      {item.period}
                    </p>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
