import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import ContributeForm from "@/components/ContributeForm";

interface PageProps {
  searchParams: Promise<{
    cause?: string;
    amount?: string;
    source?: string;
  }>;
}

async function ContributeContent({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const cause = resolvedParams?.cause || "General Contribution";
  const amount = resolvedParams?.amount || "";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col justify-between">
      {/* Header Bar */}
      <header className="bg-white dark:bg-dark border-b border-slate-100 dark:border-slate-800 sticky top-0 z-30 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-700 hover:text-primary dark:text-slate-200 transition-colors font-medium text-sm"
          >
            <ArrowLeft className="w-4.5 h-4.5" />
            <span>Home</span>
          </Link>
          <div className="relative w-36 h-9">
            <Image
              src="/logo full.png"
              alt="Meal to Smile Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow py-8 sm:py-12 px-4 sm:px-6 max-w-xl mx-auto w-full">
        <div className="bg-white dark:bg-dark rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col gap-6">
          
          {/* Card Header */}
          <div className="flex items-start gap-3.5 pb-5 border-b border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-md flex-shrink-0 mt-0.5">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-secondary font-bold text-xs uppercase tracking-wider mb-0.5">
                <Sparkles className="w-3 h-3" />
                <span>Make a Difference</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Contribute & Sponsor
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Fill the details below. Our executive will reach out to you shortly.
              </p>
            </div>
          </div>

          {/* Form */}
          <ContributeForm initialCause={cause} initialAmount={amount} />

          {/* Trust Banner */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-secondary" />
            <span>100% Direct Impact &bull; Verified Grassroots Initiative</span>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-dark text-center text-xs text-slate-400">
        <div className="max-w-4xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Meal to Smile. All rights reserved.</p>
          <p className="mt-1">WhatsApp Admin: +91 9847356680 | sacrednational@majmau.com</p>
        </div>
      </footer>
    </div>
  );
}

export default function ContributePage(props: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ContributeContent {...props} />
    </Suspense>
  );
}
