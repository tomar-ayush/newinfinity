"use client";

import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { BorderBeam } from "../../components/ui/border-beam";
import TextShimmer from "../../components/ui/text-shimmer";
import gsap from "gsap";
import { motion } from "framer-motion";

export default function HeroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const words = [
    "Automation Officer.",
    "Marketing Officer.",
    "Technology Officer.",
  ];
  const wordRef = useRef(null);
  let wordIndex = 0;

  useEffect(() => {
    if (wordRef.current) {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

      tl.to(wordRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          if (wordRef.current) {
            wordRef.current.innerText = words[wordIndex % words.length];
            wordIndex++;
          }
        },
      }).to(wordRef.current, { opacity: 1, duration: 0.5 });
    }
  }, [wordIndex]);

  return (
    <section
      id="hero"
      className="relative mx-auto mt-32 max-w-7xl px-6 text-center md:px-8"
    >
      <motion.div
        className="backdrop-filter-[12px] animate-fade-in group inline-flex h-7 -translate-y-4 items-center justify-between gap-1 rounded-full border border-theme-border bg-theme-bg px-3 text-xs text-theme-text opacity-0 transition-all ease-in hover:cursor-pointer hover:bg-theme-hover"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <TextShimmer className="inline-flex items-center justify-center">
          <span>✨ Introducing Infinity AI</span>
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </TextShimmer>
      </motion.div>

      <motion.p
        className="text-sm font-normal tracking-widest uppercase mt-6 text-theme-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">
          The only Co-Founder your business needs.
        </span>
      </motion.p>

      <motion.h1
        className="mt-8 text-3xl font-normal text-theme-title sm:text-5xl lg:text-6xl xl:text-7xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Your AI Powered Chief{" "}
        <span
          ref={wordRef}
          className="pb-3 inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500"
        >
          Automation Officer.
        </span>
      </motion.h1>

      <div className="flex flex-col items-center justify-center px-8 mt-12 space-y-5 sm:space-y-0 sm:space-x-5 sm:flex-row">
        <motion.div
          className="relative inline-flex items-center justify-center w-full sm:w-auto group"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
          <a
            href="/dashboard/ai-mailer"
            className="relative inline-flex items-center justify-center w-full px-8 py-3 text-base font-normal text-theme-button-text bg-theme-button-bg border border-transparent rounded-full sm:w-auto"
            role="button"
          >
            Start 14 Days Free Trial
          </a>
        </motion.div>

        <motion.div
          className="inline-flex items-center justify-center w-full sm:w-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <a
            href="mailto:team@thexitingway.com"
            className="inline-flex items-center justify-center w-full px-8 py-3 text-base font-normal text-theme-button-text transition-all duration-200 bg-theme-button-bg border border-gray-600 rounded-full sm:w-auto hover:border-theme-hover-border"
            role="button"
          >
            Talk to our team
          </a>
        </motion.div>
      </div>
      <div
        ref={ref}
        className="animate-fade-up relative mt-32 opacity-0 [--animation-delay:400ms] [perspective:2000px] after:absolute after:inset-0 after:z-50 after:[background:linear-gradient(to_top,hsl(var(--background))_30%,transparent)]"
      >
        <motion.div
          className={`rounded-xl border border-theme-border bg-theme-bg ${inView ? "before:animate-image-glow" : ""
            }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <BorderBeam
            size={200}
            duration={12}
            delay={11}
            colorFrom="var(--color-one)"
            colorTo="var(--color-two)"
          />

          <img
            src="/hero-dark.png"
            alt="Hero Image Dark"
            className="relative hidden size-full rounded-[inherit] border object-contain dark:block"
          />
          <img
            src="/hero-light.png"
            alt="Hero Image Light"
            className="relative block size-full rounded-[inherit] border object-contain dark:hidden"
          />
        </motion.div>
      </div>
    </section>
  );
}
