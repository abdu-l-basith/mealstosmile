"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Images,
  Sparkles,
  CheckCircle2,
  MapPin,
  Building2,
  GraduationCap,
  Utensils,
  Droplets,
  Stethoscope,
  HeartHandshake,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Share2,
  Check,
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import { Project, PROJECTS } from "@/data/projects";
import { useContribute } from "@/context/ContributeContext";
import ProjectGalleryModal from "./ProjectGalleryModal";

interface ProjectDetailViewProps {
  project: Project;
}

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const getStatIcon = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes("village") || l.includes("hub") || l.includes("reach") || l.includes("location")) {
    return <MapPin className="w-5 h-5 text-primary" />;
  }
  if (l.includes("meal") || l.includes("food") || l.includes("diet")) {
    return <Utensils className="w-5 h-5 text-secondary" />;
  }
  if (l.includes("student") || l.includes("school") || l.includes("prep") || l.includes("education")) {
    return <GraduationCap className="w-5 h-5 text-primary" />;
  }
  if (l.includes("borewell") || l.includes("water") || l.includes("drop")) {
    return <Droplets className="w-5 h-5 text-primary" />;
  }
  if (l.includes("camp") || l.includes("doctor") || l.includes("medicine") || l.includes("health")) {
    return <Stethoscope className="w-5 h-5 text-secondary" />;
  }
  if (l.includes("volunteer") || l.includes("centre") || l.includes("beneficiar")) {
    return <Users className="w-5 h-5 text-secondary" />;
  }
  return <Sparkles className="w-5 h-5 text-primary" />;
};

export default function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const { openContribute } = useContribute();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  // Other projects excluding the current one
  const otherProjects = PROJECTS.filter((p) => p.slug !== project.slug);

  const openGalleryAt = (index: number) => {
    setActiveGalleryIndex(index);
    setGalleryOpen(true);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col selection:bg-primary selection:text-white">
      {/* Sticky Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors py-2 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Projects</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/" className="relative w-32 sm:w-36 h-9">
              <Image
                src="/logo full.png"
                alt="Meal to Smile Logo"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleShare}
              title="Share Project"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-secondary" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() =>
                openContribute({
                  cause: project.title,
                  source: `Project Page (${project.title})`,
                })
              }
              className="btn-brand-gradient flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold shadow-sm hover:shadow-md cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Donate</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow py-8 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 sm:gap-16">
          
          {/* Hero / Header Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="flex flex-col gap-5 max-w-4xl"
          >
            {/* Category & Status Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                {project.category}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-secondary border border-secondary/30">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                Active Grassroots Initiative
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {project.title}
            </h1>

            {/* Tagline */}
            <p className="text-lg sm:text-xl font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.tagline}
            </p>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() =>
                  openContribute({
                    cause: project.title,
                    source: `Hero CTA (${project.title})`,
                  })
                }
                className="btn-brand-gradient flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm sm:text-base font-bold shadow-lg hover:shadow-xl hover:shadow-primary/25 cursor-pointer transform hover:-translate-y-0.5 transition-all"
              >
                <Heart className="w-5 h-5 fill-white" />
                <span>Sponsor & Contribute</span>
              </button>

              {project.gallery && project.gallery.length > 0 && (
                <button
                  onClick={() => openGalleryAt(0)}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-full text-sm sm:text-base font-bold bg-white dark:bg-slate-850 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 shadow-sm hover:border-primary hover:text-primary transition-all cursor-pointer"
                >
                  <Images className="w-5 h-5" />
                  <span>View Photos ({project.gallery.length})</span>
                </button>
              )}
            </div>
          </motion.div>

          {/* Feature Image Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative w-full h-[320px] sm:h-[460px] md:h-[540px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800 group"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            {/* Ambient Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

            {/* Bottom Floating Info Ribbon */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 text-white">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                <Compass className="w-4 h-4 text-secondary" />
                <span>Northern India Rural Region &bull; Direct Verified Intervention</span>
              </div>

              {project.gallery && project.gallery.length > 0 && (
                <button
                  onClick={() => openGalleryAt(0)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 transition-all cursor-pointer"
                >
                  <Images className="w-4 h-4" />
                  <span>Explore Gallery ({project.gallery.length} Images)</span>
                </button>
              )}
            </div>
          </motion.div>

          {/* Key Impact Stats Bar */}
          {project.stats && project.stats.length > 0 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
            >
              {project.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {stat.value}
                    </span>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                      {getStatIcon(stat.label)}
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          )}

          {/* Main Story & Highlights Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Full Narrative & Detailed Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="lg:col-span-8 flex flex-col gap-8"
            >
              {/* Detailed Overview Card */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                      About The Initiative
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                      Mission & Impact Overview
                    </h2>
                  </div>
                </div>

                <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />

                {/* Paragraphs */}
                <div className="flex flex-col gap-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  {project.detailedParagraphs?.map((paragraph, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Key Highlights / Pillars */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-4">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                      Core Pillars & Program Highlights
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {project.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium"
                        >
                          <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Special Section: Facilities (Residential Campus) */}
              {project.facilities && project.facilities.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-secondary">
                        Campus Infrastructure
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                        Planned Facilities & Campus Amenities
                      </h2>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    To deliver a transformative educational experience, the SACREd residential campus in Chharra Rafatpur is being outfitted with comprehensive facilities:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {project.facilities.map((facility, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-emerald-50/30 dark:from-slate-800/60 dark:to-slate-800/30 border border-slate-100 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200"
                      >
                        <div className="w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
                        <span>{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Section: Target Hubs & Center Clusters (Play School) */}
              {project.centers && project.centers.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                        Target Locations
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                        Pre-School Hubs & Covered Villages
                      </h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {project.centers.map((center, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex flex-col gap-3"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                          <h4 className="font-extrabold text-slate-900 dark:text-white text-base">
                            {center.hub}
                          </h4>
                        </div>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Target Villages:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {center.villages.map((v, vIdx) => (
                            <span
                              key={vIdx}
                              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600"
                            >
                              {v}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Photo Gallery Grid */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Images className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                          Visual Impact
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                          Photo Gallery
                        </h2>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">
                      {project.gallery.length} Images
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    {project.gallery.map((img, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => openGalleryAt(idx)}
                        className="relative h-36 sm:h-44 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-slate-100 dark:border-slate-800 cursor-pointer group bg-slate-100 dark:bg-slate-800"
                      >
                        <Image
                          src={img}
                          alt={`${project.title} gallery photo ${idx + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs text-[11px] font-bold px-3 py-1.5 rounded-full text-slate-900 dark:text-white shadow-md flex items-center gap-1">
                            <Images className="w-3.5 h-3.5 text-primary" /> View
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

            </motion.div>

            {/* Right Column: Sticky Donation Card & Support Tiers */}
            <motion.aside
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24"
            >
              {/* Primary Donation Card */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-xl flex flex-col gap-6">
                
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-md">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-secondary">
                      Support This Cause
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                      Make a Contribution
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Your generous sponsorship empowers direct grassroots operations for <strong>{project.title}</strong>, transforming lives in remote villages.
                </p>

                {/* Preset Sponsorship Tiers */}
                {project.supportTiers && project.supportTiers.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Select a Giving Tier:
                    </span>
                    {project.supportTiers.map((tier, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          openContribute({
                            cause: project.title,
                            amount: tier.amount,
                            source: `Tier: ${tier.title}`,
                          })
                        }
                        className="text-left p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-750 hover:border-secondary transition-all cursor-pointer group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-secondary transition-colors">
                            {tier.title}
                          </span>
                          <span className="text-xs font-extrabold text-primary px-2 py-0.5 rounded-md bg-primary/10">
                            ₹{Number(tier.amount).toLocaleString("en-IN")}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                          {tier.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                )}

                {/* Custom Amount Button */}
                <button
                  onClick={() =>
                    openContribute({
                      cause: project.title,
                      source: `Custom Amount (${project.title})`,
                    })
                  }
                  className="btn-brand-gradient w-full py-3.5 rounded-2xl text-sm font-bold shadow-md hover:shadow-lg hover:shadow-primary/25 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Donate Any Custom Amount</span>
                </button>

                {/* Trust Seal */}
                <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-secondary" />
                  <span>100% Direct Grassroots Relief</span>
                </div>
              </div>

              {/* Quick Contact & Bank Assistance Callout */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 shadow-md border border-slate-800 flex flex-col gap-3">
                <span className="text-xs font-bold text-secondary uppercase tracking-widest">
                  Need Help or Offline Support?
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  For bank transfer details, Cheque contributions, or large institutional sponsorships, contact our team directly.
                </p>
                <div className="pt-2 border-t border-slate-800 text-xs font-medium text-slate-300 flex flex-col gap-1">
                  <span>WhatsApp / Call: <strong>+91 9847356680</strong></span>
                  <span>Email: <strong>sacrednational@majmau.com</strong></span>
                </div>
              </div>
            </motion.aside>

          </div>

          {/* Explore Other Initiatives Section */}
          <div className="pt-12 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-secondary">
                  More From Sacred National
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Explore Other Initiatives
                </h2>
              </div>
              <Link
                href="/#projects"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:text-secondary transition-colors"
              >
                <span>View All 8 Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {otherProjects.slice(0, 4).map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative w-full h-40 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-white">
                      {p.category}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col gap-2 flex-grow">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {p.tagline}
                    </p>
                    <div className="mt-auto pt-3 flex items-center justify-between text-xs font-bold text-primary group-hover:text-secondary">
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Full-screen Lightbox Gallery Modal */}
      {project.gallery && project.gallery.length > 0 && (
        <ProjectGalleryModal
          isOpen={galleryOpen}
          images={project.gallery}
          currentIndex={activeGalleryIndex}
          projectTitle={project.title}
          onClose={() => setGalleryOpen(false)}
          onNavigate={(idx) => setActiveGalleryIndex(idx)}
        />
      )}
    </div>
  );
}
