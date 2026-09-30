"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  INITIAL_ADMIN_STATS,
  MONTHLY_DONATION_DATA,
  INITIAL_PAYMENTS,
  INITIAL_ACTIVITIES,
  PaymentTransaction,
} from "@/data/adminMockData";
import {
  TrendingUp,
  Users,
  Utensils,
  FolderHeart,
  ArrowUpRight,
  Download,
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  ExternalLink,
  ChevronRight,
  Plus,
  RefreshCw,
  Eye,
  CreditCard,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [timeRange, setTimeRange] = useState<"month" | "year" | "all">("year");
  const [selectedTxn, setSelectedTxn] = useState<PaymentTransaction | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const stats = INITIAL_ADMIN_STATS;
  const recentPayments = INITIAL_PAYMENTS.slice(0, 5);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("Financial & Impact Summary Report (PDF/CSV) successfully downloaded!");
    }, 800);
  };

  const getStatusBadge = (status: PaymentTransaction["status"]) => {
    switch (status) {
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
            <CheckCircle className="w-3 h-3 text-emerald-400" /> Completed
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-950/60 text-amber-300 border border-amber-500/30">
            <Clock className="w-3 h-3 text-amber-400" /> Pending
          </span>
        );
      case "Failed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-950/60 text-red-300 border border-red-500/30">
            <XCircle className="w-3 h-3 text-red-400" /> Failed
          </span>
        );
      case "Refunded":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            <RefreshCw className="w-3 h-3 text-slate-400" /> Refunded
          </span>
        );
    }
  };

  const maxRaised = Math.max(...MONTHLY_DONATION_DATA.map((d) => d.raised));

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
              Live Operations
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Last updated: Just now
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1.5">
            Meals to Smile Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time insights across donations, active projects, donor network, and meal distributions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all cursor-pointer shadow-sm"
          >
            {isExporting ? (
              <RefreshCw className="w-4 h-4 animate-spin text-teal-400" />
            ) : (
              <Download className="w-4 h-4 text-teal-400" />
            )}
            <span>{isExporting ? "Exporting..." : "Export Report"}</span>
          </button>

          <Link
            href="/admin/payments"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-teal-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>View Payments</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Donations */}
        <div className="relative overflow-hidden bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-teal-500/40 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Raised
            </span>
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              ₹{stats.totalRevenue.toLocaleString("en-IN")}
            </h3>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="inline-flex items-center text-xs font-semibold text-emerald-400">
                <ArrowUpRight className="w-3.5 h-3.5" /> +{stats.revenueGrowth}%
              </span>
              <span className="text-[11px] text-slate-400">vs last month</span>
            </div>
          </div>
        </div>

        {/* Total Donors */}
        <div className="relative overflow-hidden bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-teal-500/40 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Active Donors
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {stats.totalDonors.toLocaleString("en-IN")}
            </h3>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="inline-flex items-center text-xs font-semibold text-emerald-400">
                <ArrowUpRight className="w-3.5 h-3.5" /> +{stats.donorGrowth}%
              </span>
              <span className="text-[11px] text-slate-400">community growth</span>
            </div>
          </div>
        </div>

        {/* Meals Served */}
        <div className="relative overflow-hidden bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-teal-500/40 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Meals Distributed
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Utensils className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {stats.mealsServed.toLocaleString("en-IN")}
            </h3>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="inline-flex items-center text-xs font-semibold text-emerald-400">
                <ArrowUpRight className="w-3.5 h-3.5" /> +{stats.mealsGrowth}%
              </span>
              <span className="text-[11px] text-slate-400">nourishing lives</span>
            </div>
          </div>
        </div>

        {/* Active Projects */}
        <div className="relative overflow-hidden bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-teal-500/40 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Projects Active
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FolderHeart className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {stats.activeProjects} Active
            </h3>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-xs font-medium text-slate-400">
                {stats.completedProjects} successfully completed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Chart & Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Donation Growth Bar Chart */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Donation Inflow Trends</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Monthly funds raised vs targets across all active NGO campaigns
              </p>
            </div>
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
              <button
                onClick={() => setTimeRange("month")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  timeRange === "month"
                    ? "bg-teal-500 text-slate-950 font-bold shadow-xs"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Quarter
              </button>
              <button
                onClick={() => setTimeRange("year")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  timeRange === "year"
                    ? "bg-teal-500 text-slate-950 font-bold shadow-xs"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                2026 Year
              </button>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="pt-6 pb-2">
            <div className="h-56 flex items-end gap-2 sm:gap-4 justify-between pt-4">
              {MONTHLY_DONATION_DATA.map((item) => {
                const heightPercent = Math.round((item.raised / maxRaised) * 100);
                return (
                  <div
                    key={item.month}
                    className="flex-1 flex flex-col items-center gap-2 group h-full justify-end"
                  >
                    {/* Tooltip hint on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 border border-slate-700 text-[10px] text-teal-300 font-mono px-1.5 py-0.5 rounded shadow-lg pointer-events-none whitespace-nowrap">
                      ₹{(item.raised / 1000).toFixed(0)}k
                    </div>

                    <div className="w-full max-w-[32px] bg-slate-800 rounded-t-lg overflow-hidden h-full flex items-end">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full bg-gradient-to-t from-teal-600 to-emerald-400 rounded-t-lg transition-all duration-500 group-hover:brightness-125"
                      />
                    </div>
                    <span className="text-[11px] font-medium text-slate-400 group-hover:text-teal-300 transition-colors">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-gradient-to-tr from-teal-600 to-emerald-400" />
                <span>Actual Contributions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-slate-700" />
                <span>Fundraising Target</span>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Distribution Breakdown */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Campaign Allocation</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Current fund distribution across programs
            </p>

            <div className="space-y-4 mt-6">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-slate-200">Meals to Smile (Nutrition)</span>
                  <span className="text-teal-400 font-semibold font-mono">48%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-500 h-full rounded-full w-[48%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-slate-200">SACREd Learning Academy</span>
                  <span className="text-emerald-400 font-semibold font-mono">28%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full w-[28%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-slate-200">Rural Healthcare & Medical</span>
                  <span className="text-blue-400 font-semibold font-mono">14%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full w-[14%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-slate-200">Clean Water & Hygiene</span>
                  <span className="text-amber-400 font-semibold font-mono">10%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full w-[10%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-teal-950/40 border border-teal-500/20 mt-6">
            <div className="flex items-center gap-2 text-teal-300 text-xs font-bold">
              <span>80G Tax Exemption Status</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              All online receipts automatically dispatched with 80G tax benefit eligibility numbers.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Payments + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Payments Table */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Recent Transactions</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Latest incoming contributions to the foundation
              </p>
            </div>
            <Link
              href="/admin/payments"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800/80">
                  <th className="pb-3 font-semibold uppercase tracking-wider">Donor</th>
                  <th className="pb-3 font-semibold uppercase tracking-wider">Cause</th>
                  <th className="pb-3 font-semibold uppercase tracking-wider">Method</th>
                  <th className="pb-3 font-semibold uppercase tracking-wider">Amount</th>
                  <th className="pb-3 font-semibold uppercase tracking-wider">Status</th>
                  <th className="pb-3 font-semibold uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 pr-3">
                      <div className="font-semibold text-white">{payment.donorName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{payment.id}</div>
                    </td>
                    <td className="py-3.5 pr-3">
                      <span className="text-slate-300 font-medium">{payment.cause}</span>
                      <div className="text-[11px] text-slate-400">{payment.date}</div>
                    </td>
                    <td className="py-3.5 pr-3">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px] border border-slate-700">
                        {payment.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3.5 pr-3 font-bold text-emerald-400 font-mono">
                      ₹{payment.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3.5 pr-3">{getStatusBadge(payment.status)}</td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => setSelectedTxn(payment)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">System Activity</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <div className="mt-4 space-y-4">
              {INITIAL_ACTIVITIES.map((item) => (
                <div key={item.id} className="flex items-start gap-3 text-xs">
                  <div className={`p-2 rounded-xl border ${item.iconBg} shrink-0 mt-0.5`}>
                    <CreditCard className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-200">{item.title}</p>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
                      {item.description}
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                      {item.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <Link
              href="/admin/users"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
            >
              <Users className="w-4 h-4 text-teal-400" />
              <span>Manage User Directory</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTxn && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h4 className="font-bold text-white text-base">Transaction Details</h4>
                <p className="text-xs text-teal-400 font-mono">{selectedTxn.id}</p>
              </div>
              <button
                onClick={() => setSelectedTxn(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 py-4 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Donor Name:</span>
                <span className="font-semibold text-white">{selectedTxn.donorName}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Email:</span>
                <span className="text-slate-200 font-mono">{selectedTxn.donorEmail}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Phone:</span>
                <span className="text-slate-200">{selectedTxn.donorPhone}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Cause:</span>
                <span className="text-teal-300 font-medium">{selectedTxn.cause}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Amount:</span>
                <span className="font-bold text-emerald-400 text-sm font-mono">
                  ₹{selectedTxn.amount.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Payment Method:</span>
                <span className="text-slate-200">{selectedTxn.paymentMethod}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Status:</span>
                <span>{getStatusBadge(selectedTxn.status)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Receipt No:</span>
                <span className="text-slate-300 font-mono">{selectedTxn.receiptNumber}</span>
              </div>
              {selectedTxn.panNumber && (
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">PAN for 80G:</span>
                  <span className="text-slate-200 font-mono">{selectedTxn.panNumber}</span>
                </div>
              )}
              {selectedTxn.notes && (
                <div className="py-1.5">
                  <span className="text-slate-400 block mb-1">Notes / Purpose:</span>
                  <p className="text-slate-300 bg-slate-800/60 p-2.5 rounded-xl text-[11px]">
                    {selectedTxn.notes}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex gap-3">
              <button
                onClick={() => {
                  alert(`Receipt ${selectedTxn.receiptNumber} downloaded!`);
                  setSelectedTxn(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download 80G Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
