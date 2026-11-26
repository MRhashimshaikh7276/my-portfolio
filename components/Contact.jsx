"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Mail, MapPin, Phone } from "lucide-react";
import GithubMark from "./icons/GithubMark";
import MagneticButton from "./MagneticButton";
import RevealText from "./RevealText";
import { fadeUp, viewport } from "@/lib/animations";

const EMAIL = "hashimshaikh7276@gmail.com";
const PHONE = "9146787689";
const GITHUB = "https://github.com/MRhashimshaikh7276";
const LOCATION = "Nashik, Maharashtra";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (status !== "idle") return;

    setStatus("sent");
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}\n${form.email}`
    );

    setTimeout(() => {
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    }, 900);

    setTimeout(() => setStatus("idle"), 2600);
  };

  return (
    <section id="contact" className="relative px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:gap-12">
        <div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-accent"
          >
            Contact
          </motion.p>
          <RevealText
            as="h2"
            lineClassName="font-display font-semibold tracking-tight text-foreground"
            className="text-4xl leading-[1.02] sm:text-5xl md:text-6xl"
            lines={["Let's build", "something", "together."]}
          />
          <motion.p
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-6 max-w-md text-base text-muted sm:text-lg"
          >
            Have a project, opportunity or idea? Let&apos;s talk.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={0.3}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-10 flex flex-col gap-4"
          >
            <a
              href={`mailto:${EMAIL}`}
              data-cursor="VIEW"
              className="group flex items-center gap-3 text-sm text-foreground sm:text-base"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-accent">
                <Mail size={16} />
              </span>
              <span className="border-b border-transparent group-hover:border-foreground/40">
                {EMAIL}
              </span>
            </a>
            <a
              href={`tel:${PHONE}`}
              data-cursor="VIEW"
              className="group flex items-center gap-3 text-sm text-foreground sm:text-base"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-accent">
                <Phone size={16} />
              </span>
              <span className="border-b border-transparent group-hover:border-foreground/40">
                +91 {PHONE}
              </span>
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="VIEW"
              className="group flex items-center gap-3 text-sm text-foreground sm:text-base"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-accent">
                <GithubMark size={16} />
              </span>
              <span className="border-b border-transparent group-hover:border-foreground/40">
                github.com/MRhashimshaikh7276
              </span>
            </a>
            <div className="flex items-center gap-3 text-sm text-foreground sm:text-base">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-accent">
                <MapPin size={16} />
              </span>
              <span>{LOCATION}</span>
            </div>
          </motion.div>
        </div>

        <motion.form
          variants={fadeUp}
          custom={0.15}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          onSubmit={handleSubmit}
          className="glass flex flex-col gap-5 rounded-3xl p-7 sm:p-9"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="rounded-xl border border-border bg-foreground/3 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent/60"
              placeholder="Your name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="rounded-xl border border-border bg-foreground/3 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent/60"
              placeholder="you@example.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={form.message}
              onChange={handleChange}
              className="resize-none rounded-xl border border-border bg-foreground/3 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent/60"
              placeholder="Tell me about your project..."
            />
          </div>

          <MagneticButton
            as="button"
            type="submit"
            cursorLabel={status === "sent" ? "" : "SEND"}
            aria-live="polite"
            disabled={status !== "idle"}
            className="relative mt-2 inline-flex h-11.5 items-center justify-center gap-2 overflow-hidden rounded-full bg-foreground px-7 text-xs font-semibold uppercase tracking-[0.2em] text-background disabled:cursor-default"
          >
            <AnimatePresence mode="wait" initial={false}>
              {status === "sent" ? (
                <motion.span
                  key="sent"
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -24, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-2"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex h-4 w-4 items-center justify-center rounded-full bg-background/15"
                  >
                    <Check size={11} strokeWidth={3} />
                  </motion.span>
                  Opening Mail App
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -24, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-2"
                >
                  Send Message
                  <ArrowUpRight size={14} />
                </motion.span>
              )}
            </AnimatePresence>
          </MagneticButton>
        </motion.form>
      </div>
    </section>
  );
}
