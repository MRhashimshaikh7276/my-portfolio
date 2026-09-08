"use client";

import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Two huge, heavily blurred blobs drift across the full page height as the
 * user scrolls, giving each section a faintly different ambient tint
 * instead of hard-cutting between sections.
 */
export default function AmbientBackground() {
  const { scrollYProgress } = useScroll();

  const blobAY = useTransform(scrollYProgress, [0, 1], ["-10%", "260%"]);
  const blobAX = useTransform(scrollYProgress, [0, 0.5, 1], ["-15%", "25%", "-10%"]);
  const blobBY = useTransform(scrollYProgress, [0, 1], ["40%", "-140%"]);
  const blobBX = useTransform(scrollYProgress, [0, 0.5, 1], ["75%", "45%", "85%"]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <motion.div
        style={{ top: blobAY, left: blobAX }}
        className="absolute h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[160px]"
      />
      <motion.div
        style={{ top: blobBY, left: blobBX }}
        className="absolute h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-2/10 blur-[150px]"
      />
    </div>
  );
}
