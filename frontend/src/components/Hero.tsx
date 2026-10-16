"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants, useScroll, useTransform } from "framer-motion";

const DESKTOP_SLIDES = [
  {
    image: "/hero_img_01.jpg",
    text: "Each meal makes smile",
  },
  {
    image: "/hero_img_02.jpg",
    text: "Letters build a better Nation",
  },
  {
    image: "/hero_img_03.jpg",
    text: "Dreams draw the routs",
  },
  {
    image: "/hero_img_04.jpg",
    text: "Each meal makes smile",
  }
];

const MOBILE_SLIDES = [
  {
    image: "/mob_hero_img_01.jpg",
    text: "Each meal makes smile",
  },
  {
    image: "/mob_hero_img_02.jpg",
    text: "Letters build a better Nation",
  },
  {
    image: "/mob_hero_img_03.jpg",
    text: "Dreams draw the routs",
  },
  {
    image: "/mob_hero_img_04.jpg",
    text: "Each meal makes smile",
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "100%",
  },
  visible: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: "-80%",
    transition: {
      duration: 0.35,
      ease: "easeInOut",
    },
  },
};

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { scrollY } = useScroll();
  const heroContentY = useTransform(scrollY, [0, 500], [0, 80]);
  const heroContentOpacity = useTransform(scrollY, [0, 450], [1, 0.15]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % DESKTOP_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Smooth scroll to next section when user scrolls down from Hero section & horizontal swipe for slides
  useEffect(() => {
    let isAutoScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      if (window.scrollY < 40 && e.deltaY > 10 && !isAutoScrolling) {
        const nextSection = document.getElementById("about");
        if (nextSection) {
          isAutoScrolling = true;
          const offset = 70;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = nextSection.getBoundingClientRect().top;
          const offsetPosition = elementRect - bodyRect - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          setTimeout(() => {
            isAutoScrolling = false;
          }, 1000);
        }
      }
    };

    let touchStartY = 0;
    let touchStartX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;

      // If horizontal swipe is dominant and significant, change slides
      if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
          // Swipe left -> next slide
          setCurrentIndex((prev) => (prev + 1) % DESKTOP_SLIDES.length);
        } else {
          // Swipe right -> prev slide
          setCurrentIndex((prev) => (prev - 1 + DESKTOP_SLIDES.length) % DESKTOP_SLIDES.length);
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY < 40 && !isAutoScrolling) {
        const touchEndY = e.touches[0].clientY;
        const diff = touchStartY - touchEndY;
        if (diff > 35) {
          const nextSection = document.getElementById("about");
          if (nextSection) {
            isAutoScrolling = true;
            const offset = 70;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = nextSection.getBoundingClientRect().top;
            const offsetPosition = elementRect - bodyRect - offset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });

            setTimeout(() => {
              isAutoScrolling = false;
            }, 1000);
          }
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <section id="home" className="relative w-full overflow-hidden bg-slate-950">
      {/* =========================================================================
          1. MOBILE HERO SECTION (Only visible on mobile screens: < md)
          - Uses mob_hero_img_01 - 04 for perfect 9:16 vertical portrait composition
          - Large, bolded portrait typography with high-contrast cinematic overlay
         ========================================================================= */}
      <div className="relative h-[100dvh] min-h-[100dvh] w-full overflow-hidden block md:hidden">
        {/* Background Portrait Images with Slide Transition */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={MOBILE_SLIDES[currentIndex].image}
                alt="Sacred National Mobile Hero Image"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>

          {/* Gradients tailored for mobile portrait readability */}
          <div className="absolute inset-0 bg-black/25 z-[1] pointer-events-none" />
          {/* Top gradient protecting logo & hamburger menu */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/85 via-black/40 to-transparent z-[1] pointer-events-none" />
          {/* Bottom gradient providing high contrast for large bold text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 via-45% to-transparent z-[1] pointer-events-none" />
        </div>

        {/* Mobile Main Title - Bolded & Large for Portrait Mobile */}
        <motion.div
          style={{ y: heroContentY, opacity: heroContentOpacity }}
          className="absolute inset-0 z-10 flex items-end pb-24 min-[400px]:pb-28 px-6 sm:px-8"
        >
          <div className="w-full text-left text-white">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentIndex}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-[2.65rem] min-[360px]:text-[3.1rem] min-[410px]:text-[3.55rem] font-extrabold tracking-tight leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] flex flex-wrap"
              >
                {MOBILE_SLIDES[currentIndex].text.split(" ").map((word, i) => {
                  const isHighlight = ["smile", "Nation", "routs"].includes(
                    word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
                  );
                  return (
                    <span
                      key={i}
                      className="inline-block overflow-hidden mr-2.5 py-0.5"
                    >
                      <motion.span
                        variants={wordVariants}
                        className={`inline-block font-black ${
                          isHighlight
                            ? "text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-[0_2px_12px_rgba(7,185,179,0.4)]"
                            : "text-white"
                        }`}
                      >
                        {word}
                      </motion.span>
                    </span>
                  );
                })}
              </motion.h1>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Mobile Slide Indicators */}
        <div className="absolute bottom-8 left-0 right-0 z-20 px-6 sm:px-8">
          <div className="flex items-center justify-between">
            {/* Slide dots */}
            <div className="flex items-center gap-2.5">
              {MOBILE_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                    currentIndex === idx
                      ? "w-8 bg-gradient-to-r from-primary to-secondary shadow-md shadow-primary/40"
                      : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Subtle swipe / scroll hint */}
            <div className="flex items-center gap-1.5 text-white/60 text-xs tracking-wider uppercase font-medium">
              <span>Swipe</span>
              <span className="text-sm">&rarr;</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. LAPTOP / DESKTOP HERO SECTION (Retained exact current setup: >= md)
          - Original landscape images hero_img_01 - 04
          - Original text sizing, alignments, gradients, and scroll badge
         ========================================================================= */}
      <div className="relative h-screen min-h-screen w-full overflow-hidden hidden md:block">
        {/* Background Images with Slide to Left Transition */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={DESKTOP_SLIDES[currentIndex].image}
                alt="Sacred National Hero Image"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>

          {/* Gradient overlays for contrast and readability */}
          <div className="absolute inset-0 bg-black/30 z-[1] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent z-[1] pointer-events-none" />
          {/* Top gradient for crystal clear navbar legibility */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/70 to-transparent z-[1] pointer-events-none" />
        </div>

        {/* Main Title - Left Aligned with Word-by-Word Slide Up & Scroll Parallax */}
        <motion.div
          style={{ y: heroContentY, opacity: heroContentOpacity }}
          className="absolute inset-0 z-10 flex items-center pt-28 sm:pt-36 md:pt-44"
        >
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="max-w-4xl text-left text-white">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentIndex}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.1] drop-shadow-2xl flex flex-wrap"
                >
                  {DESKTOP_SLIDES[currentIndex].text.split(" ").map((word, i) => {
                    const isHighlight = ["smile", "Nation", "routs"].includes(
                      word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
                    );
                    return (
                      <span
                        key={i}
                        className="inline-block overflow-hidden mr-2.5 md:mr-3.5 py-0.5"
                      >
                        <motion.span
                          variants={wordVariants}
                          className={`inline-block ${
                            isHighlight
                              ? "text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
                              : ""
                          }`}
                        >
                          {word}
                        </motion.span>
                      </span>
                    );
                  })}
                </motion.h1>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Slide Indicators & Scroll Down Guide */}
        <div className="absolute bottom-8 left-0 right-0 z-20 px-6 sm:px-10 lg:px-16">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Slide dots */}
            <div className="flex items-center gap-2.5">
              {DESKTOP_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                    currentIndex === idx
                      ? "w-8 bg-gradient-to-r from-primary to-secondary"
                      : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Animated Scroll Down Badge */}
            <motion.a
              href="#about"
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="hidden sm:flex items-center gap-2 text-white/75 hover:text-white text-xs tracking-wider uppercase font-medium bg-black/30 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 transition-colors"
            >
              <span>Scroll</span>
              <motion.span
                animate={{ y: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                &darr;
              </motion.span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
