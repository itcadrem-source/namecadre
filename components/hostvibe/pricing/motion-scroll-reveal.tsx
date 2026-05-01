"use client";

import type { ReactNode } from "react";
import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";

type MotionScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
};

type MotionTimedListProps = {
  children: ReactNode;
  className?: string;
  amount?: number;
  stagger?: number;
  style?: CSSProperties;
};

type MotionTimedItemProps = {
  children: ReactNode;
  className?: string;
};

const SMOOTH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.02,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function MotionScrollReveal({
  children,
  className = "",
  delay = 0,
  amount = 0.1,
}: MotionScrollRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount, margin: "0px 0px -8% 0px" }}
      transition={reduceMotion ? undefined : { duration: 0.55, ease: SMOOTH_EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function MotionTimedList({
  children,
  className = "",
  amount = 0.1,
  stagger = 0.08,
  style,
}: MotionTimedListProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount, margin: "0px 0px -10% 0px" }}
      variants={reduceMotion ? undefined : { ...listVariants, visible: { transition: { staggerChildren: stagger, delayChildren: 0.02 } } }}
    >
      {children}
    </motion.div>
  );
}

export function MotionTimedItem({ children, className = "" }: MotionTimedItemProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={reduceMotion ? undefined : itemVariants}
      transition={reduceMotion ? undefined : { duration: 0.5, ease: SMOOTH_EASE }}
    >
      {children}
    </motion.div>
  );
}
