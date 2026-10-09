import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper/types';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';

// --- Types ---
interface ProjectItem {
  id: number;
  title: string;
  description: string;
  tag: string;
  image: string;
  projectUrl: string;
}

const ZOO_IMAGE = '/zoo-preview-vertical (1).png';
const AKOYA_IMAGE = '/akoya-preview-vertical.png';
const TOURISM_IMAGE = '/tourism-preview-vertical.png';
const BAKER_IMAGE = '/WordPress Cake Website Design _ Customizable Bakery Templates & Themes.jpg';
const OUTFIT_IMAGE = '/Landing Page Concept.jpg';
const SHOP_IMAGE = '/download (23).jpg';

const items: ProjectItem[] = [
  {
    id: 1,
    title: 'City Zoo Dashboard',
    description: 'Full CRUD zoo management app with Urdu/English i18n, RTL support, and Framer Motion animations.',
    tag: 'React · Vite · Tailwind',
    image: ZOO_IMAGE,
    projectUrl: 'https://zoo-eight-green.vercel.app/',
  },
  {
    id: 2,
    title: 'Akoya Premium Laundry',
    description: 'Luxury laundry service UI for Qatar with a booking flow and multilingual support.',
    tag: 'React · Vite · react-i18next',
    image: AKOYA_IMAGE,
    projectUrl: 'https://akoya-acwc.vercel.app/',
  },
  {
    id: 3,
    title: 'Tourism Website',
    description: 'A destination-discovery site being built from the ground up with Next.js.',
    tag: 'Next.js · Tailwind',
    image: TOURISM_IMAGE,
    projectUrl: 'https://tourism-dusky-nine.vercel.app/',
  },
  {
    id: 4,
    title: 'Bakering Website',
    description: 'A destination-discovery site being built from the ground up with Next.js.',
    tag: 'Next.js · Tailwind',
    image: BAKER_IMAGE,
    projectUrl: 'https://tourism-dusky-nine.vercel.app/',
  },
  {
    id: 5,
    title: 'OUTFIT Website',
    description: 'A destination-discovery site being built from the ground up with Next.js.',
    tag: 'Next.js · Tailwind',
    image: OUTFIT_IMAGE,
    projectUrl: 'https://tourism-dusky-nine.vercel.app/',
  },
  {
    id: 6,
    title: 'Tourism Website',
    description: 'A destination-discovery site being built from the ground up with Next.js.',
    tag: 'Next.js · Tailwind',
    image: SHOP_IMAGE,
    projectUrl: 'https://tourism-dusky-nine.vercel.app/',
  },
];

export const CurvedGalleryPage: React.FC = () => {
  const [activeItem, setActiveItem] = useState<ProjectItem>(items[0]);
  const swiperRef = useRef<SwiperType | null>(null);

  // Calculates 3D Cylindrical Perspective Transformation
  const update3DCylinder = (swiper: SwiperType) => {
    swiper.slides.forEach((slideEl) => {
      const slide = slideEl as HTMLElement & { progress?: number };
      const progress = slide.progress || 0;

      const rotateY = progress * -18;
      const translateZ = -Math.abs(progress) * 50;

      slide.style.transform = `translate3d(0px, 0px, ${translateZ}px) rotateY(${rotateY}deg)`;
      slide.style.zIndex = `${100 - Math.abs(Math.round(progress * 10))}`;
    });
  };

  const handleProjectClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="projects" className="relative w-full min-h-screen flex flex-col justify-between items-center bg-[#FAF7F2] overflow-hidden py-6 text-black">
      {/* Background Grid Accent */}
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

      {/* Top Header */}
      <div className="w-full text-center py-2 z-20">
        <h1 className="text-[50px] sm:text-[60px] font-black tracking-tight text-black uppercase">
          My Projects
        </h1>
      </div>

      {/* 3D Cylindrical Gallery Container with Curved Edge Masks */}
      <div className="relative w-full flex-1 flex items-center justify-center my-4 overflow-hidden z-10">
        {/* Top Curved Border Mask */}
        <div className="absolute top-0 left-0 w-full h-12 z-20 pointer-events-none">
          <svg className="w-full h-full fill-[#FAF7F2]" viewBox="0 0 1440 60" preserveAspectRatio="none">
            <path d="M0,0 L1440,0 L1440,0 Q720,60 0,0 Z" />
          </svg>
        </div>

        {/* Swiper Cylindrical Stage */}
        <div
          className="w-full h-[480px] sm:h-[580px] flex items-center"
          style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        >
          <Swiper
            modules={[Navigation]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              update3DCylinder(swiper);
            }}
            onProgress={update3DCylinder}
            onSetTranslate={update3DCylinder}
            centeredSlides
            slidesPerView="auto"
            spaceBetween={16}
            loop
            grabCursor
            onSlideChange={(swiper) => setActiveItem(items[swiper.realIndex])}
            className="w-full h-full !overflow-visible flex items-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {items.map((item: ProjectItem) => (
              <SwiperSlide
                key={item.id}
                className="!w-[280px] sm:!w-[380px] !h-[92%] transition-transform duration-300 ease-out"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {({ isActive }) => (
                  <div
                    onClick={() => handleProjectClick(item.projectUrl)}
                    className={`group relative w-full h-full rounded-2xl border-4 border-black overflow-hidden bg-black/10 transition-all duration-300 cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${
                      isActive ? 'ring-2 ring-black' : 'opacity-90'
                    }`}
                  >
                    {/* Project Image with hover zoom */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover select-none transition-transform duration-500 ease-out group-hover:scale-105"
                    />

                    {/* Pop-up Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 p-4">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2 bg-[#FFC309] text-black text-sm font-black uppercase px-5 py-2.5 rounded-full border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FF4E02] hover:text-white">
                        <span>View Project</span>
                        <ExternalLink size={16} />
                      </div>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Bottom Curved Border Mask */}
        <div className="absolute bottom-0 left-0 w-full h-12 z-20 pointer-events-none">
          <svg className="w-full h-full fill-[#FAF7F2]" viewBox="0 0 1440 60" preserveAspectRatio="none">
            <path d="M0,0 L1440,0 L1440,0 Q720,60 0,0 Z" />
          </svg>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="z-30 flex items-center justify-center gap-4 mb-4">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous slide"
          className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-black bg-white text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFC309] transition-all active:scale-95"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next slide"
          className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-black bg-white text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFC309] transition-all active:scale-95"
        >
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Item Info overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeItem.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="text-center z-30 max-w-xs px-4"
        >
          <h2 className="text-lg font-black uppercase tracking-tight">{activeItem.title}</h2>
          <p className="text-xs font-mono font-bold text-black/70 mt-1">{activeItem.tag}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CurvedGalleryPage;