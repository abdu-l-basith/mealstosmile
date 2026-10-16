"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  User,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle2,
  IndianRupee,
  Lock,
  X,
  ShieldCheck,
  Download,
  Copy,
  Check,
  Sparkles,
  Heart,
  Utensils,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface MealPackage {
  id: string;
  title: string;
  children: number;
  amount: string;
  tag?: string;
}

export const MEALS_SUPPORT_PACKAGES: MealPackage[] = [
  {
    id: "feed-20",
    title: "Feed 20 Children",
    children: 20,
    amount: "2000",
  },
  {
    id: "feed-50",
    title: "Feed 50 Children",
    children: 50,
    amount: "4000",
    tag: "Popular",
  },
  {
    id: "feed-75",
    title: "Feed 75 Children",
    children: 75,
    amount: "6000",
  },
  {
    id: "feed-100",
    title: "Feed 100 Children",
    children: 100,
    amount: "8000",
    tag: "Most Chosen",
  },
  {
    id: "feed-200",
    title: "Feed 200 Children",
    children: 200,
    amount: "16000",
  },
  {
    id: "feed-500",
    title: "Feed 500 Children",
    children: 500,
    amount: "40000",
    tag: "High Impact",
  },
];

interface ContributeFormProps {
  initialCause?: string;
  initialAmount?: string;
  projectSlug?: string;
  onSuccess?: () => void;
  isModal?: boolean;
}

interface PaymentSuccessData {
  paymentId: string;
  orderId?: string;
  receiptNumber: string;
  amount: string;
  donorName: string;
  cause: string;
  date: string;
}

// Helper to load Razorpay checkout script
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const PRESET_AMOUNTS = ["500", "1000", "2500", "5000", "10000"];

export default function ContributeForm({
  initialCause = "General Contribution",
  initialAmount = "",
  projectSlug = "",
  onSuccess,
  isModal = false,
}: ContributeFormProps) {
  const isMealsProject = Boolean(
    projectSlug === "meals-to-smile" ||
      (initialCause &&
        (initialCause.toLowerCase().includes("meal") ||
          initialCause.toLowerCase().includes("gift a smile")))
  );

  const [step, setStep] = useState<"packages" | "form">(
    initialAmount ? "form" : isMealsProject ? "packages" : "form"
  );
  const [selectedPackage, setSelectedPackage] = useState<string | null>(() => {
    if (initialAmount) {
      const cleaned = initialAmount.replace(/[^0-9.]/g, "").trim();
      const matched = MEALS_SUPPORT_PACKAGES.find((p) => p.amount === cleaned);
      return matched ? matched.title : null;
    }
    return null;
  });

  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(initialAmount);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<PaymentSuccessData | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [copiedTxn, setCopiedTxn] = useState(false);

  useEffect(() => {
    if (initialAmount) {
      const cleaned = initialAmount.replace(/[^0-9.]/g, "").trim();
      setAmount(cleaned);
      setStep("form");
      const matched = MEALS_SUPPORT_PACKAGES.find((p) => p.amount === cleaned);
      setSelectedPackage(matched ? matched.title : null);
    } else if (isMealsProject) {
      setStep("packages");
      setAmount("");
      setSelectedPackage(null);
    } else {
      setStep("form");
      setAmount("");
      setSelectedPackage(null);
    }
  }, [initialAmount, initialCause, isMealsProject]);

  // Pre-load script in background
  useEffect(() => {
    loadRazorpayScript();
  }, []);

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

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    // Required Amount validation
    const parsedAmount = parseFloat(amount.replace(/[^0-9.]/g, ""));
    if (!amount.trim() || isNaN(parsedAmount) || parsedAmount <= 0) {
      newErrors.amount = "Please enter a valid contribution amount (minimum ₹1)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSelectPackage = (pkg: MealPackage) => {
    setAmount(pkg.amount);
    setSelectedPackage(pkg.title);
    setStep("form");
    if (errors.amount) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.amount;
        return copy;
      });
    }
  };

  const handlePresetSelect = (preset: string) => {
    setAmount(preset);
    setSelectedPackage(null);
    if (errors.amount) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.amount;
        return copy;
      });
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    const finalCause = selectedPackage
      ? `${initialCause || "Meals to Smile"} (${selectedPackage})`
      : initialCause || "General Contribution";

    try {
      // 1. Ensure Razorpay Checkout script is loaded
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        throw new Error(
          "Payment gateway script failed to load. Please check your internet connection."
        );
      }

      // 2. Create Order from backend
      const orderRes = await fetch("/api/payment/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          whatsapp: whatsapp.trim(),
          email: email.trim() || undefined,
          amount: amount.trim(),
          cause: finalCause,
          message: message.trim() || undefined,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.error || "Failed to initialize payment order.");
      }

      const numericVal = parseFloat(amount.replace(/[^0-9.]/g, ""));

      // 3. Configure Razorpay Standard Checkout Options
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: "INR",
        name: "Meal to Smile",
        description: `Support: ${finalCause}`,
        image: "/footerlog.png",
        order_id: orderData.orderId.startsWith("order_") ? orderData.orderId : undefined,
        prefill: {
          name: name.trim(),
          email: email.trim() || "donor@mealtosmile.org",
          contact: whatsapp.trim(),
        },
        notes: {
          cause: finalCause,
          donor_name: name.trim(),
        },
        theme: {
          color: "#07b9b3",
          backdrop_color: "rgba(15, 23, 42, 0.8)",
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
          },
        },
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id?: string;
          razorpay_signature?: string;
        }) {
          try {
            // 4. Verify Payment with server
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id || orderData.orderId,
                razorpay_signature: response.razorpay_signature,
                name: name.trim(),
                whatsapp: whatsapp.trim(),
                email: email.trim() || undefined,
                amount: numericVal.toString(),
                cause: finalCause,
                message: message.trim() || undefined,
                source: isModal ? "Modal Form" : "Direct Page",
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(
                verifyData.error || "Payment verification failed. Please contact support."
              );
            }

            // Set Success State
            setSuccessData({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id || orderData.orderId,
              receiptNumber: verifyData.receiptNumber || `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
              amount: `₹ ${numericVal.toLocaleString("en-IN")}`,
              donorName: name.trim(),
              cause: finalCause,
              date: new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }),
            });

            // Reset form fields
            setName("");
            setWhatsapp("");
            setEmail("");
            setAmount("");
            setMessage("");
            setErrors({});
          } catch (verifyErr: unknown) {
            const msg =
              verifyErr instanceof Error
                ? verifyErr.message
                : "Payment succeeded but verification failed.";
            setApiError(msg);
          } finally {
            setIsSubmitting(false);
          }
        },
      };

      // Open Razorpay Gateway
      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.on("payment.failed", function (response: any) {
        setIsSubmitting(false);
        setApiError(
          response.error?.description || "Payment was declined or failed. Please try again."
        );
      });
      razorpayInstance.open();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Something went wrong initiating payment. Please try again.";
      setApiError(errorMessage);
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessData(null);
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleCopyPaymentId = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTxn(true);
    setTimeout(() => setCopiedTxn(false), 2000);
  };

  const formattedPayAmount = amount ? amount.replace(/[^0-9.]/g, "") : "";

  return (
    <div className="w-full relative">
      {/* MEALS TO SMILE PREFORM STEP */}
      {isMealsProject && step === "packages" ? (
        <div className="flex flex-col gap-4">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-primary/10 text-primary border border-primary/20 mb-2">
              <Utensils className="w-3.5 h-3.5" />
              <span>Sponsor Nutritious Meals</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Select a Meal Sponsorship Package
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Choose how many children you wish to feed with wholesome, warm meals:
            </p>
          </div>

          {/* 6 Minimal Packages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MEALS_SUPPORT_PACKAGES.map((pkg) => {
              const isPkgSelected = selectedPackage === pkg.title;
              return (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => handleSelectPackage(pkg)}
                  className={`relative p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between min-h-[88px] text-left ${
                    isPkgSelected
                      ? "bg-primary/10 dark:bg-primary/20 border-primary shadow-md ring-2 ring-primary/30"
                      : "bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/60 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-secondary hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 w-full">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      {pkg.title}
                    </span>
                    {pkg.tag && (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-secondary/15 text-secondary border border-secondary/30 uppercase tracking-wider shrink-0">
                        {pkg.tag}
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline justify-between mt-2">
                    <div className="text-xl sm:text-2xl font-black text-primary tracking-tight">
                      ₹{parseInt(pkg.amount).toLocaleString("en-IN")}
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 font-medium flex items-center gap-1">
                      Select <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Custom Amount Alternative */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Want to support with a custom amount?
            </span>
            <button
              type="button"
              onClick={() => {
                setSelectedPackage(null);
                setAmount("");
                setStep("form");
              }}
              className="text-xs font-bold text-primary hover:text-secondary hover:underline cursor-pointer"
            >
              Enter Custom Amount &rarr;
            </button>
          </div>
        </div>
      ) : (
        /* PAYMENT FORM STEP */
        <form onSubmit={handlePayment} className="flex flex-col gap-4">
          {apiError && (
            <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-red-600 dark:text-red-400 text-xs flex items-start gap-2 animate-shake">
              <X className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{apiError}</span>
            </div>
          )}

          {/* Meals to Smile Package Banner */}
          {isMealsProject && (
            <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                    {selectedPackage ? "Chosen Feeding Package" : "Custom Donation"}
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                    {selectedPackage || "Meals to Smile"} {amount ? `• ₹${Number(amount.replace(/[^0-9.]/g, "")).toLocaleString("en-IN")}` : ""}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStep("packages")}
                className="text-xs font-bold text-primary hover:text-secondary hover:underline cursor-pointer px-2 py-1 flex items-center gap-1 shrink-0"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>{selectedPackage ? "Change Package" : "Select Package"}</span>
              </button>
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
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                }}
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
                  onChange={(e) => {
                    setWhatsapp(e.target.value);
                    if (errors.whatsapp)
                      setErrors((prev) => ({ ...prev, whatsapp: "" }));
                  }}
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

          {/* Amount Field (REQUIRED) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Amount (INR) <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">
                80G Tax Exemption Eligible
              </span>
            </div>

            {/* Quick Preset Buttons (Shown for non-meals projects) */}
            {!isMealsProject && (
              <div className="grid grid-cols-5 gap-1.5 mb-2">
                {PRESET_AMOUNTS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handlePresetSelect(preset)}
                    className={`py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      amount === preset
                        ? "bg-primary text-white border-primary shadow-xs"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-primary/50"
                    }`}
                  >
                    ₹{parseInt(preset).toLocaleString("en-IN")}
                  </button>
                ))}
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold">
                <IndianRupee className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  if (errors.amount)
                    setErrors((prev) => ({ ...prev, amount: "" }));
                }}
                placeholder="Enter amount (e.g. 2500)"
                className={`w-full bg-slate-50 dark:bg-dark-light border rounded-xl pl-10 pr-3.5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all ${
                  errors.amount
                    ? "border-red-400 focus:border-red-500"
                    : "border-slate-200 dark:border-slate-700 focus:border-primary"
                }`}
              />
            </div>
            {errors.amount && (
              <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
            )}
          </div>

        {/* Message Field (Optional) */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Message / Dedication <span className="text-slate-400 lowercase font-normal">(optional)</span>
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3.5 pointer-events-none text-slate-400">
              <MessageSquare className="w-4 h-4" />
            </div>
            <textarea
              rows={isModal ? 2 : 3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. In honor of family birthday / Meals sponsorship"
              className="w-full bg-slate-50 dark:bg-dark-light border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none"
            />
          </div>
        </div>

        {/* Pay Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-brand-gradient flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all cursor-pointer disabled:opacity-75"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>
                  {formattedPayAmount ? `Pay ₹${formattedPayAmount}` : "Pay"}
                </span>
              </>
            )}
          </button>
        </div>

        {/* Payment Security Badge */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 dark:text-slate-500 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
          <span>Secured by <strong>Razorpay</strong> &bull; 256-bit SSL Encrypted</span>
        </div>
      </form>
      )}

      {/* Payment Success Confirmation Modal */}
      <AnimatePresence>
        {successData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 dark:border-slate-800 text-center flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseSuccessModal}
                className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              {/* Celebration Animation Icon */}
              <div className="relative mt-2">
                <div className="w-16 h-16 bg-gradient-to-tr from-teal-500 to-emerald-400 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-teal-500/30">
                  <CheckCircle2 className="w-9 h-9 text-slate-950" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-slate-950 shadow-sm animate-bounce">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Title & Amount Banner */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  Payment Verified
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white pt-1">
                  Thank You, {successData.donorName}!
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Your generous contribution has been successfully processed via Razorpay.
                </p>
              </div>

              {/* Payment Summary Box */}
              <div className="w-full bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/60 rounded-2xl p-4 text-left text-xs space-y-2.5">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700/60">
                  <span className="text-slate-500 dark:text-slate-400">Amount Donated:</span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-base font-mono">
                    {successData.amount}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Cause / Project:</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {successData.cause}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Receipt Number:</span>
                  <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                    {successData.receiptNumber}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Transaction ID:</span>
                  <div className="flex items-center gap-1 font-mono text-[11px] text-teal-600 dark:text-teal-400 font-semibold">
                    <span>{successData.paymentId}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyPaymentId(successData.paymentId)}
                      className="p-1 hover:text-white transition-colors"
                      title="Copy Transaction ID"
                    >
                      {copiedTxn ? (
                        <Check className="w-3 h-3 text-emerald-500" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-1 border-t border-slate-200 dark:border-slate-700/60 text-[11px] text-slate-400">
                  <span>Date:</span>
                  <span>{successData.date}</span>
                </div>
              </div>

              {/* 80G Certificate Callout */}
              <div className="w-full p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-500/30 flex items-center justify-between text-xs text-teal-800 dark:text-teal-300">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-teal-500 shrink-0" />
                  <span className="text-[11px]">80G Tax Exemption Receipt emailed</span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    alert(
                      `Receipt ${successData.receiptNumber} downloaded successfully!`
                    )
                  }
                  className="font-bold underline hover:text-teal-400 text-[11px] cursor-pointer"
                >
                  Download PDF
                </button>
              </div>

              {/* Done Button */}
              <button
                type="button"
                onClick={handleCloseSuccessModal}
                className="btn-brand-gradient w-full py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
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
