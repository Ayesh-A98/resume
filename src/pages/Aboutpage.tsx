import React, { useState } from 'react';
import { Download, Eye,  } from 'lucide-react';

// Icons
import {
  SiReact,
  SiHtml5,
  SiBootstrap,
  SiTailwindcss,
  SiPython,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
} from 'react-icons/si';
import { FaCss3Alt } from 'react-icons/fa6';
import { BiLogoPostgresql } from 'react-icons/bi';

const CV_PATH = '/Ayesha ali.pdf';

type Skill = {
  name: string;
  category: string;
  icon: React.FC<{ className?: string }>;
  color: string;
  bgHex: string;
};

// Skills Data
const skills: Skill[] = [
  { name: 'React', category: 'Frontend', icon: SiReact, color: 'text-[#61DAFB]', bgHex: '#61DAFB' },
  { name: 'Next.js', category: 'Framework', icon: SiNextdotjs, color: 'text-black', bgHex: '#000000' },
  { name: 'JavaScript', category: 'Language', icon: SiJavascript, color: 'text-[#F7DF1E]', bgHex: '#F7DF1E' },
  { name: 'TypeScript', category: 'Language', icon: SiTypescript, color: 'text-[#3178C6]', bgHex: '#3178C6' },
  { name: 'Tailwind', category: 'Styling', icon: SiTailwindcss, color: 'text-[#06B6D4]', bgHex: '#06B6D4' },
  { name: 'HTML5', category: 'Markup', icon: SiHtml5, color: 'text-[#E34F26]', bgHex: '#E34F26' },
  { name: 'CSS3', category: 'Styling', icon: FaCss3Alt, color: 'text-[#1572B6]', bgHex: '#1572B6' },
  { name: 'Bootstrap', category: 'Styling', icon: SiBootstrap, color: 'text-[#7952B3]', bgHex: '#7952B3' },
  { name: 'Python', category: 'Language', icon: SiPython, color: 'text-[#3776AB]', bgHex: '#3776AB' },
  { name: 'SQL', category: 'Database', icon: BiLogoPostgresql, color: 'text-[#4169E1]', bgHex: '#4169E1' },
];

export const AboutPage: React.FC = () => {
  const [poppingIndex, setPoppingIndex] = useState<number | null>(null);

  const handlePop = (index: number) => {
    setPoppingIndex(index);
    setTimeout(() => {
      setPoppingIndex(null);
    }, 400);
  };

  return (
    <div id="about" className="relative min-h-screen bg-[#FAF7F2] text-black font-sans overflow-hidden py-12 px-6 sm:px-12">
      {/* Background Grid */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Ambient Glows */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-10 w-80 h-80 bg-[#FFC309]/30 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], y: [0, -40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#FF4E02]/20 rounded-full blur-3xl pointer-events-none"
      />

      {/* Container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-16">
        
        {/* Header */}
        <header className="flex items-center justify-between border-b-4 border-black pb-6">
          <span className="font-black text-2xl tracking-tighter uppercase">Ayesha Ali</span>

          <motion.a
            href={CV_PATH}
            download="Ayesha_Ali_CV.pdf"
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF4E02] text-white font-black text-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform"
          >
            <Download size={18} />
            <span>DOWNLOAD CV</span>
          </motion.a>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="inline-block bg-[#FFC309] text-black font-mono font-bold text-xs uppercase px-3 py-1 rounded-md border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-4">
               Front-End Developer
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none text-black">
              Crafting Creative & Animated Digital Experiences.
            </h1>
          </div>

          <motion.a
            href={CV_PATH}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative flex-shrink-0 w-32 h-32 rounded-full bg-[#FFC309] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center cursor-pointer group overflow-hidden"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-tr from-[#FF4E02]/30 to-transparent rounded-full"
            />
            <Eye size={28} className="text-black z-10 group-hover:scale-125 transition-transform" />
            <span className="font-mono text-xs font-black uppercase tracking-wider text-black mt-1 z-10">
              View CV
            </span>
          </motion.a>
        </section>

        {/* Story Section */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
           
            <h2 className="font-mono text-sm font-black uppercase tracking-widest text-black">
            ABOUT ME
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="bg-white p-6 rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between"
            >
              <span className="text-3xl mb-4">🎓</span>
              <div>
                <h3 className="font-black text-lg mb-2">3rd-Year SE Student</h3>
                <p className="text-sm text-zinc-700 leading-relaxed font-medium">
                  Studying Software Engineering at The Islamia University of Bahawalpur with a focus on UI logic and design principles.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-[#FFC309]/20 p-6 rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between"
            >
              <span className="text-3xl mb-4">🏆</span>
              <div>
                <h3 className="font-black text-lg mb-2">Certified Frontend Dev</h3>
                <p className="text-sm text-zinc-800 leading-relaxed font-medium">
                  Earned my Front-End Development certification at CodeThinker, completing intensive training in modern web frameworks.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -6 }}
              className="bg-black text-white p-6 rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,195,9,1)] flex flex-col justify-between"
            >
              <span className="text-3xl mb-4">💡</span>
              <div>
                <h3 className="font-black text-lg mb-2 text-[#FFC309]">Design Meets Logic</h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-mono">
                  Completed a 2-month internship building live project components with React, Next.js, and Framer Motion.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Lined Up Moving Skill Bubbles */}
        <section className="flex flex-col gap-6 py-6 border-t-4 border-black">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-black uppercase tracking-widest text-black">
               Skills 
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 py-6">
            {skills.map((skill, idx) => {
              const Icon = skill.icon;
              const isPopping = poppingIndex === idx;

              return (
                <div key={skill.name} className="relative flex items-center justify-center">
                  
                  {/* Particle Burst on Pop */}
                  {isPopping && (
                    <>
                      {[...Array(8)].map((_, i) => (
                        <motion.span
                          key={i}
                          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                          animate={{
                            x: Math.cos((i * 45 * Math.PI) / 180) * 35,
                            y: Math.sin((i * 45 * Math.PI) / 180) * 35,
                            opacity: 0,
                            scale: 0,
                          }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full z-30 pointer-events-none"
                          style={{ backgroundColor: skill.bgHex }}
                        />
                      ))}
                    </>
                  )}

                  {/* Individual Moving Glass Bubble */}
                  <motion.button
                    animate={
                      isPopping
                        ? { scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }
                        : {
                            y: [0, -10 - (idx % 3) * 4, 0],
                            rotate: [0, idx % 2 === 0 ? 4 : -4, 0],
                            scale: [1, 1.04, 1],
                          }
                    }
                    transition={
                      isPopping
                        ? { duration: 0.3 }
                        : {
                            y: {
                              duration: 2.2 + (idx % 4) * 0.4,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: idx * 0.15,
                            },
                            rotate: {
                              duration: 3 + (idx % 3) * 0.5,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            },
                            scale: {
                              duration: 2.5 + (idx % 2) * 0.5,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            },
                          }
                    }
                    whileHover={{ scale: 1.25, y: -15, zIndex: 20 }}
                    whileTap={{ scale: 0.85 }}
                    onClick={() => handlePop(idx)}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-white/80 bg-gradient-to-br from-white/90 via-white/40 to-transparent backdrop-blur-md shadow-[0_8px_25px_0_rgba(0,0,0,0.08)] flex flex-col items-center justify-center cursor-pointer relative group overflow-hidden"
                  >
                    {/* Gloss Shine Reflection */}
                    <div className="absolute top-2 left-3 w-6 h-3 bg-white/90 rounded-full blur-[1px] rotate-[-20deg]" />
                    <div className="absolute bottom-2 right-3 w-2.5 h-2.5 bg-white/40 rounded-full blur-[1px]" />

                    {/* Skill Icon & Name */}
                    <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${skill.color} z-10 group-hover:scale-110 transition-transform`} />
                    <span className="text-[9px] font-mono font-black uppercase tracking-tighter mt-1 text-black z-10">
                      {skill.name}
                    </span>
                  </motion.button>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutPage;