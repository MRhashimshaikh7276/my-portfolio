"use client";

import { useEffect, useRef, useState } from "react";
import useMediaQuery from "@/lib/useMediaQuery";
import useReducedMotion from "@/lib/useReducedMotion";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const ringVisualRef = useRef(null);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const [ripples, setRipples] = useState([]);
  const isFinePointer = useMediaQuery("(pointer: fine)");
  const prefersReduced = useReducedMotion();
  const enabled = isFinePointer;

  useEffect(() => {
    if (!enabled) return;

    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let dotX = ringX;
    let dotY = ringY;
    let targetX = ringX;
    let targetY = ringY;
    let prevRingX = ringX;
    let prevRingY = ringY;
    let stretch = 0;
    let angle = 0;
    let isActive = false;

    const move = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const findTarget = (event) =>
      event.target instanceof Element
        ? event.target.closest("[data-cursor]")
        : null;

    const over = (event) => {
      const el = findTarget(event);
      if (!el) return;
      isActive = true;
      setActive(true);
      setLabel(el.getAttribute("data-cursor") || "");
    };

    const out = (event) => {
      const el = findTarget(event);
      if (!el) return;
      const related = event.relatedTarget;
      if (related instanceof Element && related.closest("[data-cursor]") === el) return;
      isActive = false;
      setActive(false);
      setLabel("");
    };

    const click = (event) => {
      if (prefersReduced) return;
      const id = Date.now() + Math.random();
      setRipples((prev) => [...prev, { id, x: event.clientX, y: event.clientY }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 650);
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    window.addEventListener("mousedown", click);

    let rafId;
    const tick = () => {
      dotX += (targetX - dotX) * 0.55;
      dotY += (targetY - dotY) * 0.55;
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;

      const dx = ringX - prevRingX;
      const dy = ringY - prevRingY;
      prevRingX = ringX;
      prevRingY = ringY;
      const speed = Math.min(Math.sqrt(dx * dx + dy * dy), 32);
      if (speed > 0.4) angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      const targetStretch = prefersReduced ? 0 : (speed / 32) * 0.55;
      stretch += (targetStretch - stretch) * 0.25;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      if (ringVisualRef.current) {
        ringVisualRef.current.style.transform = isActive
          ? "rotate(0deg) scale(1, 1)"
          : `rotate(${angle}deg) scale(${1 + stretch}, ${1 - stretch * 0.4})`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      window.removeEventListener("mousedown", click);
      cancelAnimationFrame(rafId);
    };
  }, [enabled, prefersReduced]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-100 mix-blend-difference"
      >
        <div
          ref={ringVisualRef}
          className="flex items-center justify-center rounded-full border border-white transition-[width,height,background-color,border-color] duration-300 ease-out"
          style={{
            width: active ? 92 : 36,
            height: active ? 92 : 36,
            background: active ? "rgba(255,255,255,0.1)" : "transparent",
            borderColor: "rgba(255,255,255,0.7)",
          }}
        >
          <span
            className="text-[10px] font-semibold tracking-[0.18em] text-white transition-opacity duration-200"
            style={{ opacity: active && label ? 1 : 0 }}
          >
            {label}
          </span>
        </div>
      </div>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-100 h-2 w-2 rounded-full bg-accent mix-blend-difference transition-opacity duration-200"
        style={{ opacity: active ? 0 : 1 }}
      />

      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          aria-hidden="true"
          className="cursor-ripple pointer-events-none fixed z-99 rounded-full border border-accent"
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}

      <style jsx global>{`
        @media (pointer: fine) {
          a,
          button,
          [data-cursor] {
            cursor: none;
          }
          body {
            cursor: none;
          }
        }

        .cursor-ripple {
          width: 16px;
          height: 16px;
          transform: translate(-50%, -50%) scale(1);
          opacity: 0.6;
          animation: cursor-ripple-burst 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes cursor-ripple-burst {
          to {
            transform: translate(-50%, -50%) scale(4.5);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
