"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface ProjectGalleryModalProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  projectTitle: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ProjectGalleryModal({
  isOpen,
  images,
  currentIndex,
  projectTitle,
  onClose,
  onNavigate,
}: ProjectGalleryModalProps) {
  // Keyboard event listeners (Left, Right, Escape)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onNavigate((currentIndex - 1 + images.length) % images.length);
      } else if (e.key === "ArrowRight") {
        onNavigate((currentIndex + 1) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md select-none">
        {/* Top Header Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between text-white z-20 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md">
              {currentIndex + 1} / {images.length}
            </span>
            <span className="text-sm sm:text-base font-bold text-slate-200 truncate max-w-xs sm:max-w-md">
              {projectTitle} &bull; Gallery
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer hover:rotate-90"
            aria-label="Close Gallery"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Previous Button */}
        <button
          onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md transition-all cursor-pointer z-20 hover:scale-110 active:scale-95"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        {/* Next Button */}
        <button
          onClick={() => onNavigate((currentIndex + 1) % images.length)}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md transition-all cursor-pointer z-20 hover:scale-110 active:scale-95"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        {/* Main Image Display */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="relative max-w-5xl max-h-[80vh] w-full h-[70vh] sm:h-[80vh] flex items-center justify-center p-2"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={currentImage}
              alt={`${projectTitle} Photo ${currentIndex + 1}`}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </motion.div>

        {/* Thumbnail Strip at Bottom */}
        <div className="absolute bottom-4 left-0 right-0 px-4 flex justify-center z-20">
          <div className="flex items-center gap-2 p-2 rounded-2xl bg-black/60 backdrop-blur-md max-w-full overflow-x-auto no-scrollbar">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => onNavigate(idx)}
                className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 transition-all cursor-pointer ${
                  currentIndex === idx
                    ? "ring-2 ring-primary scale-105 opacity-100"
                    : "opacity-50 hover:opacity-80"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumb ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
