"use client";

import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Two huge, heavily blurred blobs drift across the full page height as the
 * user scrolls, giving each section a faintly different ambient tint
 * instead of hard-cutting between sections.
 *
 * Positioned via transform (translate) rather than top/left: those trigger
 * a full layout + repaint on every scroll frame, which combined with these
 * large blur filters was the main source of scroll jank site-wide.
 * Transform-only changes stay on the compositor thread.
 */
export default function AmbientBackground() {
  const { scrollYProgress } = useScroll();

  const blobAY = useTransform(scrollYProgress, [0, 1], ["-10vh", "260vh"]);
  const blobAX = useTransform(scrollYProgress, [0, 0.5, 1], ["-15vw", "25vw", "-10vw"]);
  const blobBY = useTransform(scrollYProgress, [0, 1], ["40vh", "-140vh"]);
  const blobBX = useTransform(scrollYProgress, [0, 0.5, 1], ["75vw", "45vw", "85vw"]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <motion.div
        style={{ x: blobAX, y: blobAY, willChange: "transform" }}
        className="absolute h-[36rem] w-[36rem] rounded-full bg-accent/10 blur-[160px]"
      />
      <motion.div
        style={{ x: blobBX, y: blobBY, willChange: "transform" }}
        className="absolute h-[30rem] w-[30rem] rounded-full bg-accent-2/10 blur-[150px]"
      />
    </div>
  );
}
