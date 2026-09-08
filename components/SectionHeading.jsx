"use client";

import { motion } from "framer-motion";
import { fadeUp, viewport } from "@/lib/animations";
import ScrambleText from "./ScrambleText";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  id,
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-accent"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        id={id}
        custom={0.08}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl"
      >
        <ScrambleText text={title} />
      </motion.h2>
      {subtitle ? (
        <motion.p
          custom={0.16}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-5 max-w-xl text-base text-muted sm:text-lg"
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  );
}
