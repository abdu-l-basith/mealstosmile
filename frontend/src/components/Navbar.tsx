"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useContribute } from "@/context/ContributeContext";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Our Projects", href: "#projects" },
  { label: "Vision 2030", href: "#vision" },
  { label: "Donate", href: "#donate" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollYProgress } = useScroll();
  const { openContribute } = useContribute();

  // Track scroll for styling and active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ["home", "about", "projects", "vision", "donate"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.getElementById(id.replace("#", ""));
    if (target) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-dark/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shadow-md py-3"
          : "bg-transparent border-b border-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo & Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="#home" onClick={(e) => handleScrollTo(e, "#home")} className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="relative w-40 sm:w-44 h-10 sm:h-11 cursor-pointer"
              >
                <Image
                  src="/logo full white.png"
                  alt="Meal to Smile Logo"
                  fill
                  className={`object-contain transition-opacity duration-300 ${
                    scrolled ? "opacity-0" : "opacity-100"
                  }`}
                  priority
                />
                <Image
                  src="/logo full.png"
                  alt="Meal to Smile Logo"
                  fill
                  className={`object-contain transition-opacity duration-300 ${
                    scrolled ? "opacity-100" : "opacity-0"
                  }`}
                  priority
                />
              </motion.div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium tracking-wide transition-colors duration-200 ${
                    isActive
                      ? scrolled
                        ? "text-primary font-bold"
                        : "text-white font-bold"
                      : scrolled
                      ? "text-slate-700 hover:text-primary dark:text-slate-200"
                      : "text-white/85 hover:text-white drop-shadow-sm"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full ${
                        scrolled ? "bg-primary" : "bg-secondary"
                      }`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Call to Action Button */}
          <div className="hidden md:flex items-center">
            <motion.button
              onClick={() => openContribute({ cause: "General Contribution", source: "Navbar CTA" })}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="btn-brand-gradient flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm shadow-md hover:shadow-lg hover:shadow-primary/30 cursor-pointer"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <Heart className="w-4 h-4 fill-white" />
              </motion.span>
              <span>Contribute</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors ${
                scrolled
                  ? "text-slate-700 dark:text-slate-200 hover:text-primary"
                  : "text-white hover:text-secondary"
              }`}
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-3/4 max-w-sm bg-white dark:bg-dark p-6 shadow-2xl flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <div className="relative w-36 h-9">
                      <Image
                        src="/logo full.png"
                        alt="Meal to Smile Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-md text-slate-700 dark:text-slate-200 hover:text-primary focus:outline-none"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex flex-col space-y-3">
                  {NAV_ITEMS.map((item, idx) => {
                    const isActive = activeSection === item.href.replace("#", "");
                    return (
                      <motion.a
                        key={item.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 + 0.1 }}
                        href={item.href}
                        onClick={(e) => handleScrollTo(e, item.href)}
                        className={`px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                        }`}
                      >
                        {item.label}
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    openContribute({ cause: "General Contribution", source: "Mobile Menu" });
                  }}
                  className="btn-brand-gradient flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl font-bold text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  <Heart className="w-5 h-5 fill-white" />
                  <span>Contribute Now</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Real-time Scroll Progress Line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-primary to-secondary origin-left shadow-sm pointer-events-none"
        style={{ scaleX: scrollYProgress }}
      />
    </motion.nav>
  );
}

