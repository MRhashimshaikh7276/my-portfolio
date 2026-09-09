"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const COUNT_DURATION = 1100;

export default function Preloader() {
  // Defaults to visible so the server-rendered HTML already includes the
  // preloader covering the screen — if this started hidden and only flipped
  // true from an effect, there'd be a flash of the real page underneath
  // before hydration ever ran.
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const alreadyShown = sessionStorage.getItem("preloader-shown");
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (alreadyShown || prefersReduced) {
      // sessionStorage/matchMedia can only be read inside an effect, so this
      // dismissal can't be derived from props or initial state.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(false);
      return;
    }

    sessionStorage.setItem("preloader-shown", "true");
    document.body.style.overflow = "hidden";

    const start = performance.now();

    // This rAF loop and the timers below intentionally aren't cancelled on
    // cleanup: this component lives for the whole app session, and React
    // StrictMode's dev-only double invoke (mount -> cleanup -> mount) would
    // otherwise cancel the very animation the second invocation's
    // sessionStorage/startedRef guards rely on to skip re-running, leaving
    // the preloader stuck on screen.
    const tick = (now) => {
      const progress = Math.min((now - start) / COUNT_DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * 100));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    setTimeout(() => setLeaving(true), COUNT_DURATION + 200);
    setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, COUNT_DURATION + 800);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-200 overflow-hidden"
        >
          <motion.div
            animate={{ y: leaving ? "-100%" : "0%" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="noise grid-bg absolute inset-x-0 top-0 h-1/2 bg-background"
          />
          <motion.div
            animate={{ y: leaving ? "100%" : "0%" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="noise grid-bg absolute inset-x-0 bottom-0 h-1/2 bg-background"
          />

          <motion.div
            animate={{ opacity: leaving ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 flex h-full flex-col items-center justify-center gap-7"
          >
            <AnimatePresence mode="wait">
              {count < 50 ? (
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

            <div className="flex flex-col items-center gap-3">
              <div className="h-px w-56 overflow-hidden bg-border sm:w-64">
                <div
                  className="h-full bg-accent transition-[width] duration-100 ease-linear"
                  style={{ width: `${count}%` }}
                />
              </div>
              <span className="font-display text-xs tabular-nums text-muted">
                {String(count).padStart(3, "0")}%
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
