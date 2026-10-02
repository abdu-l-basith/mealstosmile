"use client";

import React from "react";
import Link from "next/link";
import { Users, Clock, ArrowLeft } from "lucide-react";

export default function UsersPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-12">
      <div className="max-w-md w-full flex flex-col items-center space-y-5 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-md">
        <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center shadow-lg shadow-teal-500/10">
          <Users className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            This module will be enabled soon
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            User and community directory management is currently under maintenance and will be activated in an upcoming update.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 text-xs font-mono text-teal-300 border border-slate-700">
          <Clock className="w-3.5 h-3.5 text-teal-400" />
          <span>Module Status: In Development</span>
        </div>

        <div className="pt-2">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-all border border-slate-700 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
