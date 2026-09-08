"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Heart, CodeXml } from "lucide-react";
import { motion, Variants } from "framer-motion";

const footerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.12,
    },
  },
};

const colVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Footer() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id.replace("#", ""));
    if (target) {
      const offset = 80;
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
    <footer className="bg-white text-slate-600 pt-16 pb-8 border-t border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12"
        >

          {/* Logo & Description */}
          <motion.div variants={colVariants} className="md:col-span-5 flex flex-col gap-4">
            <Link
              href="#home"
              onClick={(e) => handleScrollTo(e, "#home")}
              className="inline-flex items-center w-fit focus:outline-none"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="relative w-24 h-24 sm:w-28 sm:h-28 cursor-pointer"
              >
                <Image
                  src="/footerlog.png"
                  alt="Meal to Smile Logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </motion.div>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Meal to Smile works on the ground to provide food nutrition, qualitative value education,
              clean water, and healthcare facilities to impoverished rural North India.
            </p>
          </motion.div>

          {/* Quick Access Links */}
          <motion.div variants={colVariants} className="md:col-span-3 flex flex-col gap-4">
            <h4 className="text-slate-900 font-bold text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-500">
              {[
                { label: "Home", href: "#home" },
                { label: "About Us", href: "#about" },
                { label: "Our Projects", href: "#projects" },
                { label: "Vision 2030", href: "#vision" },
                { label: "Donate / Sponsor", href: "#donate" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="inline-block hover:text-primary transform hover:translate-x-1 transition-all duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={colVariants} className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-slate-900 font-bold text-sm uppercase tracking-wider">
              Contact Info
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-slate-550">
              <li className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-primary group-hover:text-secondary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-all" />
                <span>House 4/96 E, AMU Gas Agency, Firdaus Nagar, Aligarh, Uttar Pradesh, 202001, India</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="w-5 h-5 text-primary group-hover:text-secondary flex-shrink-0 group-hover:scale-110 transition-all" />
                <a href="mailto:sacrednational@majmau.com" className="hover:text-primary transition-colors">
                  sacrednational@majmau.com
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="w-5 h-5 text-primary group-hover:text-secondary flex-shrink-0 group-hover:scale-110 transition-all" />
                <a href="tel:+919847356680" className="hover:text-primary transition-colors">
                  9847 356 680, 9947 456 680
                </a>
              </li>
            </ul>
          </motion.div>

        </motion.div>

        {/* Divider */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} Meal to Smile. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Made by</span>
            <motion.span
              animate={{ scale: [1, 1.35, 1] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="inline-block"
            >
              <CodeXml className="w-3.5 h-3.5 fill-secondary text-secondary" />
            </motion.span>
            <span>Chilllex Business Assistant</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

