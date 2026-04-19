'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BlurTextEffectProps {
  children: string;
  className?: string;
  delay?: number;
}

export const BlurTextEffect: React.FC<BlurTextEffectProps> = ({ children, className = '', delay = 0 }) => {
  const chars = children.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.015, delayChildren: delay }
    }
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    hidden: {
      opacity: 0,
      y: 10,
      filter: 'blur(8px)',
    }
  };

  return (
    <motion.span
      className={`inline-block flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {chars.map((char, i) => (
        <motion.span
          variants={child}
          key={`${char}-${i}`}
          className="inline-block"
          style={{ whiteSpace: 'pre' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
};
