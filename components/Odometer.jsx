"use client";

import { AnimatePresence, motion } from "framer-motion";

function OdometerDigit({ digit }) {
  return (
    <span className="relative inline-block h-[1em] w-[0.62em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={digit}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/**
 * Renders numeric characters as independently rolling odometer wheels;
 * non-numeric characters (e.g. "+", "%") render statically.
 */
export default function Odometer({ text }) {
  return (
    <span className="inline-flex">
      {text.split("").map((char, i) =>
        /[0-9]/.test(char) ? (
          <OdometerDigit key={i} digit={char} />
        ) : (
          <span key={i}>{char}</span>
        )
      )}
    </span>
  );
}
