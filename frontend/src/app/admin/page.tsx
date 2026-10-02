"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  PaymentTransaction,
  AdminStats,
  MonthlyChartData,
  AdminActivity,
} from "@/data/adminMockData";
import {
  TrendingUp,
  Users,
  Utensils,
  FolderHeart,
  ArrowUpRight,
  Download,
  CheckCircle,
  Clock,
  XCircle,
  ChevronRight,
  Plus,
  RefreshCw,
  Eye,
  CreditCard,
  X,
  Copy,
  Check,
  Inbox,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [timeRange, setTimeRange] = useState<"month" | "year" | "all">("year");
  const [selectedTxn, setSelectedTxn] = useState<PaymentTransaction | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Dynamic Dashboard State with Zero-Baseline
  const [stats, setStats] = useState<AdminStats>({
    totalRevenue: 0,
    revenueGrowth: 0,
    totalDonors: 0,
    donorGrowth: 0,
    activeProjects: 6,
    completedProjects: 0,
    mealsServed: 0,
    mealsGrowth: 0,
  });
  const [monthlyData, setMonthlyData] = useState<MonthlyChartData[]>([]);
  const [recentPayments, setRecentPayments] = useState<PaymentTransaction[]>([]);
  const [activities, setActivities] = useState<AdminActivity[]>([]);
  const [causesBreakdown, setCausesBreakdown] = useState<{ cause: string; total: number; percentage: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("Just now");

  // Fetch live stats from API connected to Firestore
  const fetchDashboardStats = useCallback(async (showSpin = false) => {
    if (showSpin) setIsRefreshing(true);
    try {
      const res = await fetch("/api/admin/stats", { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        if (data.stats) setStats(data.stats);
        if (data.monthlyData) setMonthlyData(data.monthlyData);
        if (data.recentPayments) setRecentPayments(data.recentPayments);
        if (data.recentActivities) setActivities(data.recentActivities);
        if (data.causesBreakdown) setCausesBreakdown(data.causesBreakdown);
        setLastUpdated(
          new Date().toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })
        );
      }
    } catch (err) {
      console.error("Error fetching live dashboard stats from Firestore:", err);
    } finally {
      setIsLoading(false);
      if (showSpin) setIsRefreshing(false);
    }
  }, []);

  // Initial fetch and auto-polling every 10 seconds for live Firestore updates
  useEffect(() => {
    fetchDashboardStats();
    const interval = setInterval(() => {
      fetchDashboardStats(false);
    }, 10000);
    return () => clearInterval(interval);
  }, [fetchDashboardStats]);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      const csvHeader = "ID,Receipt,Donor Name,Email,Phone,Cause,Amount,Method,Status,Date,Time\n";
      const csvRows = recentPayments
        .map(
          (p) =>
            `"${p.id}","${p.receiptNumber}","${p.donorName}","${p.donorEmail}","${p.donorPhone}","${p.cause}",${p.amount},"${p.paymentMethod}","${p.status}","${p.date}","${p.time}"`
        )
        .join("\n");
      const blob = new Blob([csvHeader + csvRows], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `firestore_payments_export_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
    }, 500);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
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

  const maxRaised = Math.max(...monthlyData.map((d) => d.raised), 1000);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
              Firestore Live
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Last synced: {lastUpdated}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1.5">
            Meals to Smile Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time insights across live Firestore payment collections, meal distributions, and donor contributions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchDashboardStats(true)}
            disabled={isRefreshing}
            title="Refresh Live Data"
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all cursor-pointer shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-teal-400 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>Sync</span>
          </button>

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
        {/* Total Raised */}
        <div className="relative overflow-hidden bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-teal-500/40 transition-all group shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Raised
            </span>
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-white tracking-tight font-mono">
              ₹{stats.totalRevenue.toLocaleString("en-IN")}
            </h3>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="inline-flex items-center text-xs font-semibold text-emerald-400">
                <ArrowUpRight className="w-3.5 h-3.5" /> Live Firestore
              </span>
            </div>
          </div>
        </div>

        {/* Total Donors */}
        <div className="relative overflow-hidden bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-teal-500/40 transition-all group shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Active Donors
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-white tracking-tight font-mono">
              {stats.totalDonors.toLocaleString("en-IN")}
            </h3>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="inline-flex items-center text-xs font-semibold text-emerald-400">
                <ArrowUpRight className="w-3.5 h-3.5" /> Verified Donors
              </span>
            </div>
          </div>
        </div>

        {/* Meals Served */}
        <div className="relative overflow-hidden bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-teal-500/40 transition-all group shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Meals Distributed
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Utensils className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-white tracking-tight font-mono">
              {stats.mealsServed.toLocaleString("en-IN")}
            </h3>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="inline-flex items-center text-xs font-semibold text-emerald-400">
                <ArrowUpRight className="w-3.5 h-3.5" /> Real Impact
              </span>
            </div>
          </div>
        </div>

        {/* Active Projects */}
        <div className="relative overflow-hidden bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-teal-500/40 transition-all group shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Active Campaigns
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
                Grassroots initiatives
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
                Monthly funds raised across all active NGO campaigns
              </p>
            </div>
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
              <button
                onClick={() => setTimeRange("year")}
                className="px-3 py-1 rounded-lg bg-teal-500 text-slate-950 font-bold shadow-xs cursor-pointer"
              >
                2026 Year
              </button>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="pt-6 pb-2">
            <div className="h-56 flex items-end gap-2 sm:gap-4 justify-between pt-4">
              {monthlyData.map((item) => {
                const heightPercent = item.raised > 0 ? Math.max(12, Math.round((item.raised / maxRaised) * 100)) : 4;
                return (
                  <div
                    key={item.month}
                    className="flex-1 flex flex-col items-center gap-2 group h-full justify-end"
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 border border-slate-700 text-[10px] text-teal-300 font-mono px-1.5 py-0.5 rounded shadow-lg pointer-events-none whitespace-nowrap">
                      ₹{item.raised.toLocaleString("en-IN")}
                    </div>

                    <div className="w-full max-w-[32px] bg-slate-800 rounded-t-lg overflow-hidden h-full flex items-end">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t-lg transition-all duration-500 group-hover:brightness-125 ${
                          item.raised > 0
                            ? "bg-gradient-to-t from-teal-600 to-emerald-400"
                            : "bg-slate-700/40"
                        }`}
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
                <span>Contributions Received</span>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Distribution Breakdown */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Campaign Allocation</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live fund distribution across programs
            </p>

            <div className="space-y-4 mt-6">
              {causesBreakdown.filter((c) => c.total > 0).length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-xs flex flex-col items-center gap-2">
                  <Inbox className="w-6 h-6 text-slate-500" />
                  <span>No campaign allocations recorded yet in Firestore.</span>
                </div>
              ) : (
                causesBreakdown
                  .filter((c) => c.total > 0)
                  .slice(0, 4)
                  .map((c, idx) => {
                    const colors = [
                      "bg-teal-500 text-teal-400",
                      "bg-emerald-500 text-emerald-400",
                      "bg-blue-500 text-blue-400",
                      "bg-amber-500 text-amber-400",
                    ];
                    const colorClass = colors[idx % colors.length];
                    const bgCol = colorClass.split(" ")[0];
                    const textCol = colorClass.split(" ")[1];

                    return (
                      <div key={c.cause}>
                        <div className="flex justify-between text-xs font-medium mb-1.5">
                          <span className="text-slate-200 truncate pr-2">{c.cause}</span>
                          <span className={`${textCol} font-semibold font-mono`}>{c.percentage}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${Math.max(5, c.percentage)}%` }}
                            className={`${bgCol} h-full rounded-full transition-all duration-500`}
                          />
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-teal-950/40 border border-teal-500/20 mt-6">
            <div className="flex items-center gap-2 text-teal-300 text-xs font-bold">
              <span>80G Tax Exemption Receipts</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Every Razorpay donation directly updates Firestore and triggers 80G tax benefit receipt logs.
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
                Real-time Firestore payments ledger
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
            {recentPayments.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs flex flex-col items-center gap-2">
                <Inbox className="w-8 h-8 text-slate-500" />
                <p>No transactions recorded yet in Firestore.</p>
                <p className="text-slate-400 text-[11px]">
                  When a donor contributes via Razorpay, it will appear here immediately.
                </p>
              </div>
            ) : (
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
                      <td className="py-3.5 pr-3 font-bold text-white font-mono">
                        ₹{payment.amount.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3.5 pr-3">{getStatusBadge(payment.status)}</td>
                      <td className="py-3.5 text-right">
                        <button
                          onClick={() => setSelectedTxn(payment)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">Live Activity Stream</h3>
                <p className="text-xs text-slate-400 mt-0.5">Firestore real-time events</p>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="space-y-4 mt-5">
              {activities.length === 0 ? (
                <div className="py-10 text-center text-slate-400 text-xs flex flex-col items-center gap-2">
                  <Inbox className="w-6 h-6 text-slate-500" />
                  <span>No events logged yet in Firestore.</span>
                </div>
              ) : (
                activities.map((act) => (
                  <div
                    key={act.id}
                    className="flex items-start gap-3 p-3 rounded-2xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 transition-all"
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 border ${act.iconBg}`}
                    >
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{act.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
                        {act.description}
                      </p>
                      <span className="text-[10px] text-teal-400 font-mono mt-1 block">
                        {act.timestamp}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTxn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 relative">
            <button
              onClick={() => setSelectedTxn(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400">
                  {selectedTxn.receiptNumber}
                </span>
                <h3 className="text-lg font-bold text-white">Payment Details</h3>
              </div>
            </div>

            <div className="space-y-3 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-700/50">
                <span className="text-slate-400">Transaction ID:</span>
                <div className="flex items-center gap-1.5 font-mono text-teal-300">
                  <span>{selectedTxn.id}</span>
                  <button
                    onClick={() => handleCopy(selectedTxn.id)}
                    className="hover:text-white cursor-pointer"
                  >
                    {copiedId === selectedTxn.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-700/50">
                <span className="text-slate-400">Donor Name:</span>
                <span className="font-semibold text-white">{selectedTxn.donorName}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-700/50">
                <span className="text-slate-400">Contact:</span>
                <span className="text-slate-300">{selectedTxn.donorPhone || "N/A"}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-700/50">
                <span className="text-slate-400">Email:</span>
                <span className="text-slate-300">{selectedTxn.donorEmail || "N/A"}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-700/50">
                <span className="text-slate-400">Allocated Cause:</span>
                <span className="text-teal-300 font-medium">{selectedTxn.cause}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-700/50">
                <span className="text-slate-400">Amount Paid:</span>
                <span className="text-base font-bold text-emerald-400 font-mono">
                  ₹{selectedTxn.amount.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-700/50">
                <span className="text-slate-400">Payment Gateway:</span>
                <span className="font-mono text-slate-300">{selectedTxn.paymentMethod}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-700/50">
                <span className="text-slate-400">Status:</span>
                <div>{getStatusBadge(selectedTxn.status)}</div>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-slate-400">Timestamp:</span>
                <span className="text-slate-300 font-mono">
                  {selectedTxn.date} at {selectedTxn.time}
                </span>
              </div>
            </div>

            {selectedTxn.notes && (
              <div className="p-3 bg-slate-800/40 rounded-xl text-xs text-slate-400 border border-slate-800">
                <span className="font-semibold text-slate-300">Notes / Remarks: </span>
                {selectedTxn.notes}
              </div>
            )}

            <button
              onClick={() => setSelectedTxn(null)}
              className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
