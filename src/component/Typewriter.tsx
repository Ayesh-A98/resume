import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const QUOTE = `I'm a software developer who builds reliable, well-crafted applications. I focus on clean code, thoughtful architecture, and solving real problems—take a look at the projects below to see that in action.`;

// Reusable typewriter hook — reveals text smoothly one character at a time
function useTypewriter(text: string, speed = 40, start = true) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!start) return;
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, start]);

  return displayed;
}

export function TypewriterQuoteBlock({ isPushed }: { isPushed: boolean }) {
  // Wait for the slide-in animation (0.7s) to finish before typing starts
  const [readyToType, setReadyToType] = useState(false);

  useEffect(() => {
    if (!isPushed) {
      setReadyToType(false);
      return;
    }
    const t = setTimeout(() => setReadyToType(true), 700);
    return () => clearTimeout(t);
  }, [isPushed]);

  // Changed speed from 22 to 38 for a smoother, easier-to-read pace
  const typed = useTypewriter(QUOTE, 38, readyToType);
  const isDone = typed.length === QUOTE.length;

  return (
    <motion.div
      initial={{ x: '100vw', opacity: 0, rotate: 10 }}
      animate={{ x: 0, opacity: 1, rotate: 2 }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative flex-1 max-w-sm z-10"
    >
      {/* Neo-brutalist Quote Bubble */}
      <div className="bg-black text-white p-5 rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,195,9,1)] min-h-[9.5rem] flex flex-col justify-center">
        <p className="text-sm sm:text-base font-mono font-medium leading-relaxed tracking-wide text-justify">
          "{typed}
          {/* Smooth Blinking Neon Cursor */}
          {!isDone && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-[#FFC309] ml-1 align-middle"
            />
          )}
          "
        </p>
      </div>
    </motion.div>
  );
}