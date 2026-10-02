"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { PROJECTS } from "@/data/projects";

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-4"
        >
          <span className="text-secondary font-bold text-xs uppercase tracking-widest inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Our Initiatives
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Our Projects
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full mt-2"
          />
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Discover our comprehensive projects focused on nurturing local communities, establishing learning centres, 
            supplying clean water, and bringing health and food security to Northern India.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
        >
          {PROJECTS.map((project) => (
            <motion.div
              key={project.slug}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.25 }}
              className="h-full"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group flex flex-col h-full bg-white dark:bg-dark rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-100 dark:border-slate-800 transition-shadow duration-300"
              >
                {/* Image Thumbnail */}
                <div className="relative w-full h-48 overflow-hidden bg-slate-200">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/0 to-slate-900/0 pointer-events-none" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-white">
                    {project.category}
                  </div>

                  {/* Floating Action Tag */}
                  <div className="absolute top-3 right-3 bg-white/90 dark:bg-dark/90 backdrop-blur-sm p-2 rounded-full text-slate-800 dark:text-slate-200 shadow-md transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:text-white group-hover:rotate-45">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Text Body */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm line-clamp-3 leading-relaxed flex-1">
                    {project.tagline || project.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs font-bold text-primary group-hover:text-secondary transition-colors">
                    <span>View Full Details</span>
                    <ArrowRight className="w-4 h-4 transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

