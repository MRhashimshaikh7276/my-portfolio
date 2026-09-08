"use client";

import { LayoutDashboard, Layers3, ServerCog, SquareCode } from "lucide-react";
import SectionHeading from "./SectionHeading";
import MagneticButton from "./MagneticButton";
import TiltCard from "./TiltCard";
import { fadeUp, viewport } from "@/lib/animations";
import { motion } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Frontend Development",
    description: "Responsive and interactive React interfaces.",
    icon: SquareCode,
  },
  {
    number: "02",
    title: "Backend Development",
    description: "Scalable Node.js and Express REST APIs.",
    icon: ServerCog,
  },
  {
    number: "03",
    title: "Full Stack Applications",
    description: "Complete MERN applications from frontend to backend.",
    icon: Layers3,
  },
  {
    number: "04",
    title: "CMS & Admin Systems",
    description: "Custom dashboards, CMS and management systems.",
    icon: LayoutDashboard,
  },
];

export default function Services() {
  return (
    <section id="services" className="relative px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="What I Do" title="Services built around outcomes." />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                custom={i * 0.08}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
              >
                <TiltCard max={5}>
                  <MagneticButton
                    as="div"
                    strength={0.15}
                    className="group relative block h-full overflow-hidden rounded-2xl glass p-8 transition-colors hover:border-accent/40"
                  >
                    <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/0 blur-2xl transition-colors duration-500 group-hover:bg-accent/20" />
                    <div className="mb-6 flex items-center justify-between">
                      <span className="font-display text-sm font-semibold text-muted">
                        {service.number}
                      </span>
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-accent transition-transform duration-500 group-hover:-translate-y-1">
                        <Icon size={18} aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted sm:text-base">
                      {service.description}
                    </p>
                  </MagneticButton>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
