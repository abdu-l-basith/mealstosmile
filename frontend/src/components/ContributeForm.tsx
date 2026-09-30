"use client";

import React, { useState, useEffect } from "react";
import { User, Phone, Mail, MessageSquare, CheckCircle2, IndianRupee, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContributeFormProps {
  initialCause?: string;
  initialAmount?: string;
  onSuccess?: () => void;
  isModal?: boolean;
}

export default function ContributeForm({
  initialCause = "General Contribution",
  initialAmount = "",
  onSuccess,
  isModal = false,
}: ContributeFormProps) {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(initialAmount);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    if (initialAmount) {
      // Clean any dollar signs if coming from old initial values
      const cleaned = initialAmount.replace("$", "").trim();
      setAmount(cleaned);
    }
  }, [initialAmount]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) {
      newErrors.name = "Please enter your full name";
    }
    if (!whatsapp.trim()) {
      newErrors.whatsapp = "Please enter your WhatsApp number";
    } else if (!/^[+0-9\s-]{7,18}$/.test(whatsapp.trim())) {
      newErrors.whatsapp = "Please enter a valid WhatsApp number";
    }
    // Email is optional, but if provided must be valid
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contribute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          whatsapp: whatsapp.trim(),
          email: email.trim() || undefined,
          amount: amount.trim() || undefined,
          message: message.trim() || undefined,
          cause: initialCause || "General Contribution",
          source: isModal ? "Modal Form" : "Direct Page",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit. Please try again.");
      }

      // Reset form fields
      setName("");
      setWhatsapp("");
      setEmail("");
      setAmount("");
      setMessage("");
      setErrors({});
      setShowSuccessPopup(true);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setApiError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="w-full relative">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {apiError && (
          <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-red-600 dark:text-red-400 text-xs">
            {apiError}
          </div>
        )}

        {/* Name Field */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className={`w-full bg-slate-50 dark:bg-dark-light border rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all ${
                errors.name
                  ? "border-red-400 focus:border-red-500"
                  : "border-slate-200 dark:border-slate-700 focus:border-primary"
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* WhatsApp & Email (Optional) Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* WhatsApp Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              WhatsApp Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="e.g. +91 9847356680"
                className={`w-full bg-slate-50 dark:bg-dark-light border rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all ${
                  errors.whatsapp
                    ? "border-red-400 focus:border-red-500"
                    : "border-slate-200 dark:border-slate-700 focus:border-primary"
                }`}
              />
            </div>
            {errors.whatsapp && (
              <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>
            )}
          </div>

          {/* Email Field (Optional) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Email Address <span className="text-slate-400 lowercase font-normal">(optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. name@example.com"
                className={`w-full bg-slate-50 dark:bg-dark-light border rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all ${
                  errors.email
                    ? "border-red-400 focus:border-red-500"
                    : "border-slate-200 dark:border-slate-700 focus:border-primary"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Amount Field (INR only, Optional) */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Amount (INR) <span className="text-slate-400 lowercase font-normal">(optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <IndianRupee className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 2,000"
              className="w-full bg-slate-50 dark:bg-dark-light border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Message Field (Optional) */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Message <span className="text-slate-400 lowercase font-normal">(optional)</span>
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3.5 pointer-events-none text-slate-400">
              <MessageSquare className="w-4 h-4" />
            </div>
            <textarea
              rows={isModal ? 2 : 3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              className="w-full bg-slate-50 dark:bg-dark-light border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-brand-gradient flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-md hover:shadow-xl hover:shadow-primary/30 transition-all cursor-pointer disabled:opacity-75"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Submit Form</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Submission Success Popup Modal */}
      <AnimatePresence>
        {showSuccessPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm bg-white dark:bg-dark rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 dark:border-slate-800 text-center flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close icon */}
              <button
                onClick={handleCloseSuccessPopup}
                className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              <div className="w-14 h-14 bg-secondary/15 rounded-2xl flex items-center justify-center text-secondary mt-1">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-snug">
                  Details shared, our executive will contact you soon
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Thank you for your willingness to support Meal to Smile.
                </p>
              </div>

              <button
                onClick={handleCloseSuccessPopup}
                className="btn-brand-gradient w-full py-2.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer mt-1"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
