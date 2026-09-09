"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Odometer from "./Odometer";
import { fadeUp, staggerContainer, viewport } from "@/lib/animations";

const stats = [
  { value: 2, suffix: "+", label: "Year Experience" },
  { value: 3, suffix: "+", label: "Major Projects" },
  { value: null, display: "MERN", label: "Stack" },
  { value: 100, suffix: "%", label: "Passion" },
];

const softSkills = [
  "Problem Solving",
  "Logical Thinking",
  "Good Communication",
  "Team Collaboration",
  "Quick Learner",
];

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame;
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref} className="inline-flex items-baseline">
      <Odometer text={String(display).padStart(2, "0")} />
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:gap-12">
        <div>
          <SectionHeading
            eyebrow="About Me"
            title="Engineering thoughtful, production-ready software."
            subtitle="I'm a Full Stack Developer specializing in the MERN stack. I build scalable backend APIs, responsive interfaces and production-ready web applications with a strong focus on clean code, usability and performance."
          />

          <motion.ul
            variants={staggerContainer(0.06, 0.3)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-7 flex flex-wrap gap-2"
          >
            {softSkills.map((skill) => (
              <motion.li
                key={skill}
                variants={fadeUp}
                className="rounded-full border border-border bg-foreground/3 px-3.5 py-1.5 text-xs font-medium text-muted"
              >
                {skill}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i * 0.1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="glass rounded-2xl p-6 sm:p-8"
            >
              <p className="font-display text-4xl font-semibold text-foreground sm:text-5xl">
                {stat.value !== null ? (
                  <Counter value={stat.value} suffix={stat.suffix} />
                ) : (
                  stat.display
                )}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
