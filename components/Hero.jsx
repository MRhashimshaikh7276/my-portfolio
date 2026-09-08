"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import RevealText from "./RevealText";
import MagneticButton from "./MagneticButton";
import FloatingParticles from "./FloatingParticles";

export default function Hero() {
  const sectionRef = useRef(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const glowX = useSpring(mvX, { stiffness: 60, damping: 20 });
  const glowY = useSpring(mvY, { stiffness: 60, damping: 20 });
  const translateX = useTransform(glowX, (v) => `${v}px`);
  const translateY = useTransform(glowY, (v) => `${v}px`);
  const translateXReverse = useTransform(glowX, (v) => `${v * -0.6}px`);

  const handleMouseMove = (event) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mvX.set(((event.clientX - rect.left) / rect.width - 0.5) * 60);
    mvY.set(((event.clientY - rect.top) / rect.height - 0.5) * 60);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="noise relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-32 pb-20 sm:px-10 lg:px-16"
    >
      <div className="grid-bg absolute inset-0" aria-hidden="true" />

      <motion.div
        aria-hidden="true"
        style={{ x: translateX, y: translateY }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-1/3 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[140px]"
      />
      <motion.div
        aria-hidden="true"
        style={{ x: translateXReverse }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-accent-2/20 blur-[120px]"
      />
      <FloatingParticles />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-foreground/5 px-4 py-1.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Available for opportunities
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 text-sm font-semibold uppercase tracking-[0.4em] text-accent"
        >
          Full Stack Developer
        </motion.p>

        <RevealText
          as="h1"
          delay={1.85}
          lineClassName="font-display font-semibold tracking-tight text-foreground"
          className="max-w-5xl text-[13vw] leading-[0.98] sm:text-[9vw] md:text-[6.4vw] lg:text-[5.4rem]"
          lines={["Building digital", "experiences that", "actually work."]}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-xl text-base text-muted sm:text-lg"
        >
          Hi, I&apos;m Hashim — a MERN Stack Developer with 2+ years of experience
          building production-ready web applications.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            as="a"
            href="#projects"
            cursorLabel="VIEW"
            className="inline-flex items-center justify-center rounded-full bg-foreground px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-background transition-transform"
          >
            View My Work
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#contact"
            cursorLabel="VIEW"
            className="inline-flex items-center justify-center rounded-full border border-border px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-foreground/5"
          >
            Contact Me
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.8 }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-muted">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-accent" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </section>
  );
}
