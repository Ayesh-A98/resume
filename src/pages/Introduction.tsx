import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypewriterQuoteBlock } from '../component/Typewriter';

const cornerDots = [
  { x: 0, y: 0, size: 'w-3 h-3', delay: 0 },
  { x: 20, y: 15, size: 'w-2 h-2', delay: 0.15 },
  { x: 10, y: 30, size: 'w-4 h-4', delay: 0.3 },
  { x: 35, y: 5, size: 'w-2.5 h-2.5', delay: 0.45 },
  { x: 25, y: 40, size: 'w-3 h-3', delay: 0.6 },
];

const DotCluster: React.FC<{ corner: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }> = ({ corner }) => {
  const positionClasses = {
    'top-left': 'left-4 top-4',
    'top-right': 'right-4 top-4',
    'bottom-left': 'left-4 bottom-4',
    'bottom-right': 'right-4 bottom-4',
  };

  return (
    <div id="introduction" className={`absolute ${positionClasses[corner]} z-40 pointer-events-none`}>
      {cornerDots.map((dot, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -14, 0] }}
          transition={{
            duration: 1 + (i % 3) * 0.2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: dot.delay,
          }}
          className={`absolute ${dot.size} rounded-full bg-[#FFC309] shadow-md`}
          style={{
            left: corner.includes('left') ? dot.x : undefined,
            right: corner.includes('right') ? dot.x : undefined,
            top: corner.includes('top') ? dot.y : undefined,
            bottom: corner.includes('bottom') ? dot.y : undefined,
          }}
        />
      ))}
    </div>
  );
};

// Funky floating badge stickers
const FloatingBadge = ({ text, delay, className }: { text: string; delay: number; className: string }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ 
      scale: 1, 
      opacity: 1,
      y: [0, -12, 0],
      rotate: [-3, 3, -3]
    }}
    transition={{
      scale: { delay, duration: 0.4 },
      opacity: { delay, duration: 0.4 },
      y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay },
      rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay }
    }}
    whileHover={{ scale: 1.15, rotate: 0 }}
    className={`absolute z-30 px-3.5 py-1.5 rounded-full border-2 border-black font-black text-xs sm:text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer select-none ${className}`}
  >
    {text}
  </motion.div>
);

export const IntroPage: React.FC = () => {
  const [animationStep, setAnimationStep] = useState<'circles' | 'intro' | 'pushed'>('circles');

  useEffect(() => {
    const circleTimer = setTimeout(() => {
      setAnimationStep('intro');
    }, 2800);

    const pushTimer = setTimeout(() => {
      setAnimationStep('pushed');
    }, 5000);

    return () => {
      clearTimeout(circleTimer);
      clearTimeout(pushTimer);
    };
  }, []);

  const isPushed = animationStep === 'pushed';

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center font-sans bg-[#FAF7F2]">
      {/* Neo-Brutal Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Floating Retro Graphics/Crosshairs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 text-black/10 text-8xl font-black select-none tracking-widest">
          AYESHA
        </div>
        <div className="absolute bottom-10 left-12 text-black/20 text-4xl font-mono">
          + + +
        </div>
        <div className="absolute top-20 right-16 text-black/20 text-4xl font-mono">
          [ 01 / INTRO ]
        </div>
      </div>

      {/* Funky Floating Stickers/Badges */}
      <FloatingBadge text="⚡ UI/UX Master" delay={3} className="top-24 left-[10%] bg-[#FFC309] text-black" />
      <FloatingBadge text="🎨 Creative Dev" delay={3.2} className="bottom-28 left-[8%] bg-[#FF4E02] text-white" />
      <FloatingBadge text="✨ Problem Solver" delay={3.4} className="top-28 right-[12%] bg-[#FF9400] text-black" />
      <FloatingBadge text="🚀 React & Motion" delay={3.6} className="bottom-24 right-[10%] bg-black text-white border-white" />

      <DotCluster corner="top-left" />
      <DotCluster corner="top-right" />
      <DotCluster corner="bottom-left" />
      <DotCluster corner="bottom-right" />

      {/* Circle Expansion Animations */}
      <AnimatePresence>
        {animationStep === 'circles' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 25] }}
              transition={{ duration: 2.2, ease: [0.76, 0, 0.24, 1] }}
              className="absolute w-40 h-40 rounded-full bg-[#FFC309] z-10"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 25] }}
              transition={{ duration: 2.2, delay: 0.25, ease: [0.76, 0, 0.24, 1] }}
              className="absolute w-40 h-40 rounded-full bg-[#FF9400] z-20"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 25] }}
              transition={{ duration: 2.2, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="absolute w-40 h-40 bg-[#FF4E02] rounded-full z-0"
            />
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-6 sm:px-12">
        {animationStep !== 'circles' && (
          <div className="relative flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-10 max-w-6xl w-full">
            {/* IMAGE CARD WITH POP-OUT SHADOW */}
            <AnimatePresence>
              {isPushed && (
                <motion.div
                  initial={{ x: '-100vw', opacity: 0, rotate: 10 }}
                  animate={{ x: 0, opacity: 1, rotate: -2 }}
                  transition={{ duration: 0.7, ease: [0.175, 0.885, 0.32, 1.275] }}
                  className="w-[300px] h-[300px] sm:w-99 sm:h-98 bg-black rounded-2xl p-3 shadow-[8px_8px_0px_0px_rgba(255,195,9,1)] border-4 border-black overflow-hidden flex-shrink-0"
                >
                  <img
                    src="/Portfolio Design.jpg"
                    alt="Profile/Work Preview"
                    className="w-full h-full object-cover rounded-xl border-2 border-white/20"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* NAME / TITLE */}
            <motion.div
              initial={{ y: '-140vh', rotate: -18, scale: 1.15, opacity: 0 }}
              animate={{ y: 0, x: 0, rotate: 0, scale: 1, opacity: 1 }}
              transition={{
                y: { duration: 0.75, ease: [0.175, 0.885, 0.32, 1.275] },
                x: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              }}
              className="relative flex flex-col items-start text-left max-w-md z-10"
            >
              <AnimatePresence>
                {!isPushed && (
                  <motion.div
                    initial={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <h1 className="text-5xl sm:text-7xl font-black text-zinc-900 tracking-tight leading-none mb-4">
                      I'm <span className="underline decoration-[#FF4E02] decoration-wavy decoration-4">Ayesha ALI</span>
                    </h1>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isPushed && (
                <motion.p
                  initial={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg sm:text-2xl font-medium text-zinc-800 bg-[#FFC309]/30 px-3 py-1 rounded-md border-l-4 border-[#FF4E02]"
                >
                  A creative UI/UX Designer & Frontend Developer.
                </motion.p>
              )}
            </motion.div>

            <AnimatePresence>
              {isPushed && <TypewriterQuoteBlock isPushed={isPushed} />}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntroPage;