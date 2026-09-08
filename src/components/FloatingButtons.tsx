"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Gift } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useContribute } from "@/context/ContributeContext";

const ADMIN_WHATSAPP_NUMBER = "919847356680";

export default function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);
  const { openContribute } = useContribute();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-40 flex flex-col gap-3"
        >
          {/* WhatsApp Floating Button */}
          <motion.a
            href={`https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=Hello%20Meal%20to%20Smile,%20I%20want%20to%20know%20more%20about%20your%20initiatives.`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            className="w-12 h-12 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-colors duration-300 group cursor-pointer relative"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-6 h-6 fill-white stroke-[1.5]" />
            
            {/* Tooltip */}
            <span className="absolute right-14 bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md pointer-events-none">
              Chat on WhatsApp
            </span>
          </motion.a>

          {/* Gift Floating Button */}
          <motion.button
            onClick={() => openContribute({ cause: "Gift a Smile", source: "Floating Action Button" })}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            className="btn-brand-gradient w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 relative group cursor-pointer"
            title="Contribute / Gift a Smile"
          >
            {/* Pulsing Outer Ring */}
            <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping pointer-events-none" />
            
            <Gift className="w-5 h-5 stroke-[2.5]" />
            
            {/* Tooltip */}
            <span className="absolute right-14 bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md pointer-events-none">
              Contribute / Gift
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

