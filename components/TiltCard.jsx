"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Wraps children in a perspective container and tilts them toward the
 * cursor on mouse move, settling back flat on mouse leave.
 */
export default function TiltCard({ children, className = "", max = 8, ...props }) {
  const ref = useRef(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springX = useSpring(rotX, { stiffness: 150, damping: 18 });
  const springY = useSpring(rotY, { stiffness: 150, damping: 18 });

  const handleMouseMove = (event) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotY.set(px * max);
    rotX.set(py * -max);
  };

  const handleMouseLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 800 }}
      className="h-full"
      {...props}
    >
      <motion.div
        style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
        className={`h-full ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
