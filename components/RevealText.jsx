"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ease } from "@/lib/animations";

/**
 * Splits text into lines that reveal upward with a stagger, clipped by
 * overflow-hidden wrappers so each line masks in rather than fading flatly.
 *
 * Intersection is observed on the stable outer wrapper rather than the
 * animated lines themselves: the lines sit inside an overflow-hidden mask
 * and start translated out of their own clip box, so an observer attached
 * directly to a line would always measure zero visible area and never fire.
 */
export default function RevealText({
  lines,
  as: Component = "div",
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.09,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <Component ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={`block will-change-transform ${lineClassName}`}
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : undefined}
            transition={{
              duration: 0.9,
              ease,
              delay: delay + i * stagger,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
