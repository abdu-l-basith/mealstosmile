"use client";

import { CheckCircle2, Target } from "lucide-react";
import { motion, Variants } from "framer-motion";

const MILESTONES = [
  "Establish Rural Learning Centres in 100 villages",
  "Enroll 5000 out-of-school children in primary education",
  "Launch Mobile Learning Vans to reach remote areas",
  "Train 200 local youth as \"community educators\"",
  "Expand ration kit program to reach 10000 families annually",
  "Conduct monthly medical camps and health camps",
  "Awareness workshop in 500 villages",
  "Create 500+ jobs or income opportunities in rural communities",
  "Plant 50000 trees under the sustainable initiative",
];

const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Vision() {
  return (
    <section id="vision" className="py-20 md:py-28 bg-white dark:bg-dark relative overflow-hidden">
      {/* Subtle Animated Background decoration */}
      <motion.div
        animate={{
          y: [0, -25, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
        className="absolute right-0 top-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          y: [0, 25, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 9,
          ease: "easeInOut",
        }}
        className="absolute left-0 bottom-1/4 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Vision Details */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-widest">
              <Target className="w-4 h-4 text-secondary" />
              <span>Vision 2030</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white leading-tight">
              Empowering Rural India with Education and Dignity
            </h2>

            <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              By 2030, every child and family in rural India should have access to quality education,
              essential resources, and opportunities for a dignified life. We are committed to paving
              the path towards self-reliance, wellness, and environmental sustainability.
            </p>
          </motion.div>

          {/* Right Column: 9 Milestones Grid */}
          <div className="lg:col-span-7">
            <motion.div
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {MILESTONES.map((milestone, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-dark-light rounded-xl border border-slate-100 dark:border-slate-800/80 hover:border-primary/40 hover:shadow-md transition-colors duration-300"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5 text-secondary fill-secondary/10" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
                    {milestone}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

