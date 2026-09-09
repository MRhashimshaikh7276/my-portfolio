"use client";

import { Download } from "lucide-react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

const RESUME_URL = "/Hashim-Shaikh-Resume.pdf";

export default function FloatingResumeButton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 right-6 z-50 sm:bottom-8 sm:right-8"
    >
      <MagneticButton
        as="a"
        href={RESUME_URL}
        download
        cursorLabel="DOWNLOAD"
        strength={0.25}
        className="glass-strong flex items-center gap-2 rounded-full px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-foreground shadow-[0_8px_30px_-8px_rgba(0,0,0,0.5)] transition-colors hover:border-accent/40"
      >
        <Download size={14} className="text-accent" />
        Resume
      </MagneticButton>
    </motion.div>
  );
}
