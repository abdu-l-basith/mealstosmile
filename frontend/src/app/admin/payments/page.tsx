"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  INITIAL_PAYMENTS,
  CAUSES_LIST,
  PaymentTransaction,
} from "@/data/adminMockData";
import {
  Search,
  Filter,
  Download,
  Plus,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  Eye,
  Mail,
  Copy,
  Check,
  CreditCard,
  DollarSign,
  FileText,
  X,
} from "lucide-react";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<PaymentTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [causeFilter, setCauseFilter] = useState<string>("All");
  const [selectedTxn, setSelectedTxn] = useState<PaymentTransaction | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New manual transaction form state
  const [newTxn, setNewTxn] = useState({
    donorName: "",
    donorEmail: "",
    donorPhone: "",
    cause: CAUSES_LIST[0],
    amount: "",
    paymentMethod: "UPI" as const,
    panNumber: "",
    notes: "",
  });

  // Fetch live payments from API
  const fetchPayments = useCallback(async (showSpin = false) => {
    if (showSpin) setIsRefreshing(true);
    try {
      const res = await fetch("/api/admin/payments", { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.payments)) {
        setPayments(data.payments);
      }
    } catch (err) {
      console.error("Error fetching live payments:", err);
    } finally {
      setIsLoading(false);
      if (showSpin) setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPayments();
    const interval = setInterval(() => {
      fetchPayments(false);
    }, 10000);
    return () => clearInterval(interval);
  }, [fetchPayments]);

  // Filtered payments calculation
  const filteredPayments = useMemo(() => {
    return payments.filter((item) => {
      const matchesSearch =
        item.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.donorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.donorPhone.includes(searchTerm);

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesCause =
        causeFilter === "All" || item.cause === causeFilter;

      return matchesSearch && matchesStatus && matchesCause;
    });
  }, [payments, searchTerm, statusFilter, causeFilter]);

  // Aggregate stats
  const totalVolume = useMemo(() => {
    return filteredPayments
      .filter((p) => p.status === "Completed")
      .reduce((acc, curr) => acc + curr.amount, 0);
  }, [filteredPayments]);

  const completedCount = useMemo(() => {
    return filteredPayments.filter((p) => p.status === "Completed").length;
  }, [filteredPayments]);

  const pendingCount = useMemo(() => {
    return filteredPayments.filter((p) => p.status === "Pending").length;
  }, [filteredPayments]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTxn.donorName.trim() || !newTxn.amount.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTxn),
      });

      const data = await res.json();
      if (data.success && data.payment) {
        setPayments((prev) => [data.payment, ...prev]);
        setShowAddModal(false);
        setNewTxn({
          donorName: "",
          donorEmail: "",
          donorPhone: "",
          cause: CAUSES_LIST[0],
          amount: "",
          paymentMethod: "UPI",
          panNumber: "",
          notes: "",
        });
      } else {
        alert(data.error || "Failed to record payment.");
      }
    } catch (err) {
      console.error("Error creating payment:", err);
      alert("Error saving transaction.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExportCSV = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      const csvHeader = "ID,Receipt,Donor Name,Email,Phone,Cause,Amount,Method,Status,Date,Time\n";
      const csvRows = filteredPayments
        .map(
          (p) =>
            `"${p.id}","${p.receiptNumber}","${p.donorName}","${p.donorEmail}","${p.donorPhone}","${p.cause}",${p.amount},"${p.paymentMethod}","${p.status}","${p.date}","${p.time}"`
        )
        .join("\n");
      const blob = new Blob([csvHeader + csvRows], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `payments_export_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
    }, 500);
  };

  const getStatusBadge = (status: PaymentTransaction["status"]) => {
    switch (status) {
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
            <CheckCircle className="w-3 h-3 text-emerald-400" /> Completed
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-950/60 text-amber-300 border border-amber-500/30">
            <Clock className="w-3 h-3 text-amber-400" /> Pending
          </span>
        );
      case "Failed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-950/60 text-red-300 border border-red-500/30">
            <XCircle className="w-3 h-3 text-red-400" /> Failed
          </span>
        );
      case "Refunded":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            <RefreshCw className="w-3 h-3 text-slate-400" /> Refunded
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header & Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Payments & Donations
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 font-mono">
              {payments.length} Records
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track, filter, verify, and export all Razorpay gateway transactions and offline donations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchPayments(true)}
            disabled={isRefreshing}
            title="Refresh Transactions"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-teal-400 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>Sync</span>
          </button>

          <button
            onClick={handleExportCSV}
            disabled={isExporting}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all cursor-pointer"
          >
            {isExporting ? (
              <RefreshCw className="w-4 h-4 animate-spin text-teal-400" />
            ) : (
              <Download className="w-4 h-4 text-teal-400" />
            )}
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-teal-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Record Offline Donation</span>
          </button>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-center justify-between shadow-md">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Filtered Revenue
            </span>
            <h3 className="text-2xl font-bold text-emerald-400 font-mono mt-1">
              ₹{totalVolume.toLocaleString("en-IN")}
            </h3>
          </div>
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-center justify-between shadow-md">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Successful Transactions
            </span>
            <h3 className="text-2xl font-bold text-white font-mono mt-1">
              {completedCount}
            </h3>
          </div>
          <div className="p-3 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-xl">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-center justify-between shadow-md">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Pending Verification
            </span>
            <h3 className="text-2xl font-bold text-amber-400 font-mono mt-1">
              {pendingCount}
            </h3>
          </div>
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, phone, or TXN..."
            className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>

          {/* Cause Filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Cause:</span>
            <select
              value={causeFilter}
              onChange={(e) => setCauseFilter(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
            >
              <option value="All">All Causes</option>
              {CAUSES_LIST.map((cause) => (
                <option key={cause} value={cause}>
                  {cause}
                </option>
              ))}
            </select>
          </div>

          {(searchTerm || statusFilter !== "All" || causeFilter !== "All") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("All");
                setCauseFilter("All");
              }}
              className="text-xs text-teal-400 hover:text-teal-300 px-2 py-1 underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Payments Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-800/60 text-slate-400 border-b border-slate-800 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">Transaction ID</th>
                <th className="py-3.5 px-4">Donor Details</th>
                <th className="py-3.5 px-4">Cause / Campaign</th>
                <th className="py-3.5 px-4">Method</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 text-sm">
                    No payment records found matching current filters.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="py-3.5 px-4 font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-teal-300">{p.id}</span>
                        <button
                          onClick={() => handleCopy(p.id)}
                          className="text-slate-400 hover:text-white p-1 rounded transition-colors"
                          title="Copy ID"
                        >
                          {copiedId === p.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                      <span className="text-[10px] text-slate-400 block font-mono">
                        {p.receiptNumber}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{p.donorName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{p.donorEmail}</div>
                      <div className="text-[10px] text-slate-400">{p.donorPhone}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-medium text-slate-200">{p.cause}</span>
                    </td>

                    <td className="py-3.5 px-4 font-mono">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] border border-slate-700">
                        {p.paymentMethod}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-emerald-400 text-sm font-mono">
                      ₹{p.amount.toLocaleString("en-IN")}
                    </td>

                    <td className="py-3.5 px-4 text-slate-400">
                      <div className="text-slate-300">{p.date}</div>
                      <div className="text-[10px] font-mono">{p.time}</div>
                    </td>

                    <td className="py-3.5 px-4">{getStatusBadge(p.status)}</td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedTxn(p)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="View Receipt & Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Counter */}
        <div className="p-4 bg-slate-800/40 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>
            Showing <strong className="text-white">{filteredPayments.length}</strong> of{" "}
            <strong className="text-white">{payments.length}</strong> total records
          </span>
          <span className="text-[11px] font-mono text-teal-400">
            Live Synchronized
          </span>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTxn && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative animate-in fade-in zoom-in-95">
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
                <h4 className="font-bold text-white text-base">Receipt Details</h4>
              </div>
            </div>

            <div className="space-y-3 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-700/50">
                <span className="text-slate-400">Transaction ID:</span>
                <span className="font-mono text-teal-300 font-bold">{selectedTxn.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-700/50">
                <span className="text-slate-400">Donor Name:</span>
                <span className="font-semibold text-white">{selectedTxn.donorName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-700/50">
                <span className="text-slate-400">Phone / WhatsApp:</span>
                <span className="text-slate-300">{selectedTxn.donorPhone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-700/50">
                <span className="text-slate-400">Email:</span>
                <span className="text-slate-300">{selectedTxn.donorEmail}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-700/50">
                <span className="text-slate-400">Cause:</span>
                <span className="text-teal-300">{selectedTxn.cause}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-700/50">
                <span className="text-slate-400">Amount Paid:</span>
                <span className="text-base font-bold text-emerald-400 font-mono">
                  ₹{selectedTxn.amount.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-700/50">
                <span className="text-slate-400">Method:</span>
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
                <span className="font-semibold text-slate-300">Notes: </span>
                {selectedTxn.notes}
              </div>
            )}

            <button
              onClick={() => setSelectedTxn(null)}
              className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Record Offline Donation Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Record Offline Donation</h3>
                <p className="text-xs text-slate-400">
                  Log direct bank transfers, cash gifts, or offline cheque receipts.
                </p>
              </div>
            </div>

            <form onSubmit={handleAddTransaction} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Donor Name *</label>
                  <input
                    type="text"
                    required
                    value={newTxn.donorName}
                    onChange={(e) => setNewTxn({ ...newTxn, donorName: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newTxn.amount}
                    onChange={(e) => setNewTxn({ ...newTxn, amount: e.target.value })}
                    placeholder="e.g. 5000"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Donor Email</label>
                  <input
                    type="email"
                    value={newTxn.donorEmail}
                    onChange={(e) => setNewTxn({ ...newTxn, donorEmail: e.target.value })}
                    placeholder="donor@example.com"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    value={newTxn.donorPhone}
                    onChange={(e) => setNewTxn({ ...newTxn, donorPhone: e.target.value })}
                    placeholder="+91 98000 00000"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Cause / Campaign</label>
                  <select
                    value={newTxn.cause}
                    onChange={(e) => setNewTxn({ ...newTxn, cause: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                  >
                    {CAUSES_LIST.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Payment Method</label>
                  <select
                    value={newTxn.paymentMethod}
                    onChange={(e) =>
                      setNewTxn({
                        ...newTxn,
                        paymentMethod: e.target.value as any,
                      })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                  >
                    <option value="UPI">UPI / QR</option>
                    <option value="Bank Transfer">Direct Bank NEFT/RTGS</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Net Banking">Net Banking</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Notes / Remarks</label>
                <input
                  type="text"
                  value={newTxn.notes}
                  onChange={(e) => setNewTxn({ ...newTxn, notes: e.target.value })}
                  placeholder="e.g. Cheque No #88921 received"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold transition-all shadow-md shadow-teal-500/20 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Recording..." : "Save Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
