"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import useReducedMotion from "@/lib/useReducedMotion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 * Resolves scrambled random characters into the final text once it enters
 * the viewport, left-to-right, like a terminal decoding a string.
 */
export default function ScrambleText({
  text,
  as: Component = "span",
  className = "",
  duration = 700,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = useState(text);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current || prefersReduced) return;
    startedRef.current = true;

    const start = performance.now();
    let frameId;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const revealCount = Math.floor(progress * text.length);
      const next = text
        .split("")
        .map((char, i) => {
          if (char === " " || i < revealCount) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplay(next);
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [inView, text, duration, prefersReduced]);

  return (
    <Component ref={ref} className={className}>
      {display}
    </Component>
  );
}
