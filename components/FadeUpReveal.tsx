"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

export interface FadeUpRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  customIndex?: number;
  className?: string;
  inView?: boolean;
}

/**
 * Isolated client component wrapper for scroll-reveal and staggered entrance animations.
 * Allows parent pages (like app/page.tsx) to remain pure React Server Components (RSC),
 * significantly reducing client-side bundle size and Time to Interactive (TTI).
 */
export function FadeUpReveal({
  children,
  delay = 0,
  duration = 0.5,
  customIndex,
  className,
  inView = false,
  ...props
}: FadeUpRevealProps) {
  const calculatedDelay = customIndex !== undefined ? customIndex * 0.12 : delay;

  if (inView) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: calculatedDelay, duration, ease: [0.22, 1, 0.36, 1] }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: calculatedDelay,
        duration,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function FadeScaleReveal({
  children,
  duration = 0.5,
  className,
  ...props
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
} & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
