"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Preloader() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const alreadyShown = sessionStorage.getItem("preloader-shown");
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (alreadyShown) {
      document.body.style.overflow = "";
      return;
    }

    sessionStorage.setItem("preloader-shown", "true");

    if (prefersReduced) return;

    // One-time mount decision gated on sessionStorage/matchMedia, which can
    // only be read inside an effect — not derivable from props or state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
    document.body.style.overflow = "hidden";

    // Timers intentionally aren't cancelled on cleanup: this component lives
    // for the whole app session, and React StrictMode's dev-only double
    // invoke (mount -> cleanup -> mount) would otherwise cancel the very
    // timers the second invocation's sessionStorage guard relies on to skip
    // re-running, leaving the preloader stuck on screen.
    setTimeout(() => setPhase(1), 550);
    setTimeout(() => setPhase(2), 1150);
    setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 1650);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          animate={{
            clipPath:
              phase === 2
                ? "inset(0 0 100% 0)"
                : "inset(0 0 0% 0)",
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative text-center">
            <AnimatePresence mode="wait">
              {phase < 1 ? (
                <motion.p
                  key="name"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
                >
                  HASHIM.
                </motion.p>
              ) : (
                <motion.p
                  key="role"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-xs font-semibold uppercase tracking-[0.4em] text-accent"
                >
                  Full Stack Developer
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
