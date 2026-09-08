"use client";

import { useState } from "react";
import { Heart, Droplet, Soup, Landmark, ArrowRight, Check } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useContribute } from "@/context/ContributeContext";

const DONATE_CARDS = [
  {
    id: "meal",
    icon: Soup,
    title: "Gift a Smile",
    description: "Sponsor a nutritious meal to any impoverished village in North India.",
    suggestedAmount: "2,000",
    buttonText: "Sponsor Meals",
  },
  {
    id: "well",
    icon: Droplet,
    title: "Grant a Drop",
    description: "Gift a tubewell or water purification unit to ensure clean, disease-free drinking water.",
    suggestedAmount: "10,000",
    buttonText: "Gift a Well",
  },
  {
    id: "ration",
    icon: Heart,
    title: "Give Ration",
    description: "Donate to our Ration of Love program and support struggling families with monthly kits.",
    suggestedAmount: "3,500",
    buttonText: "Donate Ration",
  },
  {
    id: "land",
    icon: Landmark,
    title: "Find a Land",
    description: "Contribute to building or buying new spaces for our learning centers and campuses.",
    suggestedAmount: "25,000",
    buttonText: "Contribute to Land",
  },
];

const containerVariants: Variants = {
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

export default function Donate() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const { openContribute } = useContribute();

  const handleCardClick = (card: typeof DONATE_CARDS[0]) => {
    setSelectedCard(card.id);
    openContribute({
      cause: `${card.title} (${card.buttonText})`,
      amount: card.suggestedAmount,
    });
  };

  return (
    <section id="donate" className="py-20 md:py-28 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-4"
        >
          <span className="text-secondary font-bold text-xs uppercase tracking-widest inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Make an Impact
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Let&apos;s make a smile
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full mt-2"
          />
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Your generous contributions go directly to the rural communities in North India.
            Choose an action below to get involved and sponsor a project today.
          </p>
        </motion.div>

        {/* Donation Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {DONATE_CARDS.map((card) => {
            const Icon = card.icon;
            const isSelected = selectedCard === card.id;

            return (
              <motion.div
                key={card.id}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCardClick(card)}
                className={`group cursor-pointer flex flex-col h-full bg-white dark:bg-dark p-6 sm:p-8 rounded-2xl border transition-all duration-300 relative ${
                  isSelected
                    ? "border-primary shadow-xl ring-2 ring-primary/30"
                    : "border-slate-100 dark:border-slate-800 hover:border-primary/40 hover:shadow-2xl"
                }`}
              >
                {/* Floating Select Badge */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 bg-primary text-white p-1 rounded-full shadow-md"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </motion.div>
                )}

                {/* Card Icon */}
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-2xl mb-6 transition-all duration-300 ${
                    isSelected
                      ? "bg-primary text-white"
                      : "bg-primary/10 text-primary group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-secondary group-hover:text-white group-hover:scale-110 shadow-sm"
                  }`}
                >
                  <Icon className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-3 group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed flex-1 mb-6">
                  {card.description}
                </p>

                {/* Suggested Amount & CTA */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
                  <button
                    className={`btn-brand-gradient flex items-center justify-center gap-2 w-full py-3 rounded-full font-bold text-xs sm:text-sm shadow-sm hover:shadow-md cursor-pointer ${
                      isSelected ? "ring-2 ring-primary ring-offset-2" : ""
                    }`}
                  >
                    <span>{card.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}

