"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const MOTION_TAGS = {
  button: motion.create("button"),
  a: motion.create("a"),
  div: motion.create("div"),
};

export default function MagneticButton({
  as = "button",
  children,
  className = "",
  strength = 0.35,
  cursorLabel,
  ...props
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const MotionComponent = MOTION_TAGS[as] ?? MOTION_TAGS.button;

  const handleMouseMove = (event) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <MotionComponent
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      data-cursor={cursorLabel}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
