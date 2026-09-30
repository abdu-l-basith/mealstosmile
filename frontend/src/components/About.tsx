"use client";

import Image from "next/image";
import { Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useContribute } from "@/context/ContributeContext";

export default function About() {
  const { openContribute } = useContribute();

  return (
    <section id="about" className="py-16 md:py-24 bg-white dark:bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-slate-50 dark:bg-dark-light rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-800"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">

            {/* Small Image Block - occupies 5 cols */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, x: -30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative w-full h-[280px] md:h-[350px] rounded-2xl overflow-hidden shadow-lg group"
            >
              <Image
                src="/team.jpeg"
                alt="Meals to Smile Impact Photo"
                width={600}
                height={450}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
              
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute bottom-4 left-4 right-4 text-white text-xs bg-primary/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl text-center font-semibold tracking-wide shadow-md flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dedicated Meal to Smile Team</span>
              </motion.div>
            </motion.div>

            {/* Content Block - occupies 7 cols */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col gap-2"
              >
                <span className="text-secondary font-bold text-xs uppercase tracking-widest inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  Our Mission
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  Igniting the Flame of Change
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal"
              >
                Northern India faces numerous challenges that contribute to the cycle of poverty. Lack of
                access to quality education, limited employment opportunities, and inadequate nutrition perpetuate
                the struggles faced by these communities. Families and children suffer the most, deprived of
                essential resources, trapped in the clutches of hopelessness.
                <br /><br />
                The dedicated <strong>Meal to Smile</strong> team has taken
                up the responsibility to ignite the flame of change. Your contribution can be the catalyst for their
                transformation.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.button
                  onClick={() => openContribute({ cause: "Meal to Smile Mission", source: "About Section" })}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="btn-brand-gradient inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm shadow-md hover:shadow-xl hover:shadow-primary/30 cursor-pointer group"
                >
                  <motion.span
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  >
                    <Heart className="w-4 h-4 fill-white" />
                  </motion.span>
                  <span>I want to Contribute</span>
                </motion.button>
              </motion.div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

