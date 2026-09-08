"use client";

import { useMemo } from "react";

const PARTICLE_COUNT = 16;

/**
 * A handful of small dots drifting slowly upward and fading in/out, purely
 * via CSS keyframes so it costs nothing on the main thread.
 */
export default function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        left: `${(i * 137.5) % 100}%`,
        size: 2 + ((i * 37) % 3),
        duration: 14 + ((i * 7) % 10),
        delay: -(i * 1.3),
      })),
    []
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle absolute bottom-0 rounded-full bg-accent/40"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes particle-drift {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }
        .particle {
          animation-name: particle-drift;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .particle {
            animation: none;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
