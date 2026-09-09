"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { fadeUp, staggerContainer, viewport } from "@/lib/animations";

const responsibilities = [
  "Developing and maintaining full-stack web applications using React, Node.js, Express.js and MongoDB.",
  "Building secure and scalable REST APIs and integrating them with frontend applications.",
  "Working on live production websites and handling real client requirements.",
  "Implementing responsive UI designs and optimizing application performance.",
  "Collaborating with team members to debug issues and deliver features on time.",
];

export default function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Experience" title="Where I've been building." />

        <div ref={containerRef} className="relative mt-16 max-w-3xl pl-10 sm:pl-14">
          <div className="absolute left-0 top-1 h-full w-px bg-border" aria-hidden="true" />
          <motion.div
            style={{ scaleY: lineScale, transformOrigin: "top" }}
            className="absolute left-0 top-1 h-full w-px bg-accent shadow-[0_0_12px_rgba(62,225,255,0.6)]"
            aria-hidden="true"
          />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="relative"
          >
            <span
              className="absolute -left-10 top-1.5 h-3 w-3 rounded-full bg-accent shadow-[0_0_12px_rgba(62,225,255,0.8)] sm:-left-14"
              aria-hidden="true"
            />
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              01 &middot; Currently Working
            </p>
            <h3 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
              Full Stack Developer &mdash; MERN
            </h3>
            <p className="mt-1 text-sm font-medium uppercase tracking-[0.15em] text-muted">
              2+ Years Experience
            </p>
            <motion.ul
              variants={staggerContainer(0.08, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-5 flex max-w-xl flex-col gap-3"
            >
              {responsibilities.map((item) => (
                <motion.li
                  key={item}
                  variants={fadeUp}
                  className="flex items-start gap-3 text-sm leading-relaxed text-muted sm:text-base"
                >
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
