"use client";

import React, { useState } from "react";
import {
  Building,
  CreditCard,
  Bell,
  Shield,
  Save,
  CheckCircle2,
  KeyRound,
  Mail,
  Smartphone,
  Globe,
  Lock,
  QrCode,
  Sliders,
  AlertCircle,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "general" | "payments" | "notifications" | "security"
  >("general");

  const [savedToast, setSavedToast] = useState(false);

  // General Settings State
  const [generalForm, setGeneralForm] = useState({
    orgName: "Meal to Smile (SACREd Foundation)",
    tagline: "Nourishing bodies, empowering minds, fostering dignity.",
    contactEmail: "contact@mealtosmile.org",
    contactPhone: "+91 98450 00123",
    address: "SACREd Complex, Sector 4, Hyderabad, Telangana - 500081",
    currency: "INR (₹)",
    timezone: "Asia/Kolkata (IST +5:30)",
    regNumber80G: "AAATS1234F20231",
  });

  // Payment Gateways State
  const [paymentForm, setPaymentForm] = useState({
    razorpayKeyId: "rzp_live_98a7sd8f7a6sdf",
    razorpayKeySecret: "••••••••••••••••••••••••••••••",
    upiVpa: "donate@mealtosmile",
    testMode: false,
    autoReceipts: true,
  });

  // Notification Settings State
  const [notifForm, setNotifForm] = useState({
    adminEmailAlerts: true,
    donorConfirmationEmail: true,
    dailyDigest: true,
    minAlertAmount: "10000",
    smtpHost: "smtp.sendgrid.net",
    smtpPort: "587",
  });

  // Security State
  const [securityForm, setSecurityForm] = useState({
    currentUsername: "admin",
    currentPassword: "123",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
    sessionTimeoutMins: "60",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Portal Settings & Configuration
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure organization info, payment integrations, notifications, and security protocols.
          </p>
        </div>

        {savedToast && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-lg animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Settings saved successfully!</span>
          </div>
        )}
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab("general")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "general"
              ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          <Building className="w-4 h-4" />
          <span>General Organization</span>
        </button>

        <button
          onClick={() => setActiveTab("payments")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "payments"
              ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Payment Gateways</span>
        </button>

        <button
          onClick={() => setActiveTab("notifications")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "notifications"
              ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Email & Alerts</span>
        </button>

        <button
          onClick={() => setActiveTab("security")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "security"
              ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Security & Auth</span>
        </button>
      </div>

      {/* Tab Panels */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* TAB 1: GENERAL */}
        {activeTab === "general" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-in fade-in">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-base font-bold text-white">Organization Profile</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Public charity entity details displayed on receipts and certificates.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div className="sm:col-span-2">
                <label className="block text-slate-400 uppercase font-semibold text-[10px] mb-1.5">
                  Legal Organization Name
                </label>
                <input
                  type="text"
                  value={generalForm.orgName}
                  onChange={(e) =>
                    setGeneralForm({ ...generalForm, orgName: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-400 uppercase font-semibold text-[10px] mb-1.5">
                  Organization Tagline / Mission
                </label>
                <input
                  type="text"
                  value={generalForm.tagline}
                  onChange={(e) =>
                    setGeneralForm({ ...generalForm, tagline: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-semibold text-[10px] mb-1.5">
                  Official Contact Email
                </label>
                <input
                  type="email"
                  value={generalForm.contactEmail}
                  onChange={(e) =>
                    setGeneralForm({ ...generalForm, contactEmail: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-semibold text-[10px] mb-1.5">
                  Official Contact Phone
                </label>
                <input
                  type="text"
                  value={generalForm.contactPhone}
                  onChange={(e) =>
                    setGeneralForm({ ...generalForm, contactPhone: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-400 uppercase font-semibold text-[10px] mb-1.5">
                  Registered Headquarters Address
                </label>
                <textarea
                  rows={2}
                  value={generalForm.address}
                  onChange={(e) =>
                    setGeneralForm({ ...generalForm, address: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-semibold text-[10px] mb-1.5">
                  80G Tax Exemption Certificate Number
                </label>
                <input
                  type="text"
                  value={generalForm.regNumber80G}
                  onChange={(e) =>
                    setGeneralForm({ ...generalForm, regNumber80G: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-teal-300 font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-semibold text-[10px] mb-1.5">
                  Default Accounting Currency
                </label>
                <input
                  type="text"
                  disabled
                  value={generalForm.currency}
                  className="w-full px-3.5 py-2.5 bg-slate-800/50 border border-slate-700/60 rounded-xl text-slate-400 font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PAYMENTS */}
        {activeTab === "payments" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-in fade-in">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-base font-bold text-white">Payment Integrations</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Connect and manage online payment processors and direct UPI channels.
              </p>
            </div>

            <div className="space-y-5 text-xs">
              <div className="p-4 rounded-2xl bg-teal-950/30 border border-teal-500/20 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">Sandbox / Test Mode</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Allow test payments using simulated gateways without charging real cards.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={paymentForm.testMode}
                    onChange={(e) =>
                      setPaymentForm({ ...paymentForm, testMode: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                </label>
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-semibold text-[10px] mb-1.5">
                  Razorpay Live Key ID
                </label>
                <input
                  type="text"
                  value={paymentForm.razorpayKeyId}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, razorpayKeyId: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-semibold text-[10px] mb-1.5">
                  Razorpay Secret Key
                </label>
                <input
                  type="password"
                  value={paymentForm.razorpayKeySecret}
                  onChange={(e) =>
                    setPaymentForm({
                      ...paymentForm,
                      razorpayKeySecret: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-semibold text-[10px] mb-1.5">
                  Official Foundation UPI VPA ID (For Instant QR / App donations)
                </label>
                <input
                  type="text"
                  value={paymentForm.upiVpa}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, upiVpa: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-teal-300 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: NOTIFICATIONS */}
        {activeTab === "notifications" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-in fade-in">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-base font-bold text-white">Email & Notification Rules</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Control automated receipt deliveries, admin alerts, and daily summaries.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60">
                <div>
                  <h4 className="font-bold text-white">Automated Tax Receipt Dispatch</h4>
                  <p className="text-[11px] text-slate-400">
                    Instantly email 80G tax receipt PDF upon successful donation.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notifForm.donorConfirmationEmail}
                  onChange={(e) =>
                    setNotifForm({
                      ...notifForm,
                      donorConfirmationEmail: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded text-teal-500 focus:ring-teal-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60">
                <div>
                  <h4 className="font-bold text-white">High-Value Donation Alerts</h4>
                  <p className="text-[11px] text-slate-400">
                    Send real-time SMS & email notifications to leadership for donations exceeding threshold.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notifForm.adminEmailAlerts}
                  onChange={(e) =>
                    setNotifForm({
                      ...notifForm,
                      adminEmailAlerts: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded text-teal-500 focus:ring-teal-500 cursor-pointer"
                />
              </div>

              <div className="pt-2">
                <label className="block text-slate-400 uppercase font-semibold text-[10px] mb-1.5">
                  High-Value Alert Threshold (₹ INR)
                </label>
                <input
                  type="number"
                  value={notifForm.minAlertAmount}
                  onChange={(e) =>
                    setNotifForm({ ...notifForm, minAlertAmount: e.target.value })
                  }
                  className="w-full sm:w-64 px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SECURITY */}
        {activeTab === "security" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-in fade-in">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-base font-bold text-white">Security & Access Management</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Current hardcoded administrative credentials and session controls.
              </p>
            </div>

            {/* Current Active Credentials Info Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-950/60 to-emerald-950/60 border border-teal-500/30 text-xs">
              <div className="flex items-center gap-2 font-bold text-teal-300">
                <Shield className="w-4 h-4" />
                <span>Current Active Credentials</span>
              </div>
              <p className="text-slate-300 text-[11px] mt-1.5 leading-relaxed">
                As configured, the system uses hardcoded authentication:
              </p>
              <div className="flex items-center gap-4 mt-2">
                <div className="bg-black/40 px-3 py-1.5 rounded-lg border border-teal-500/20 font-mono text-slate-200">
                  Username: <strong className="text-teal-300">admin</strong>
                </div>
                <div className="bg-black/40 px-3 py-1.5 rounded-lg border border-teal-500/20 font-mono text-slate-200">
                  Password: <strong className="text-teal-300">123</strong>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-xs pt-2">
              <div>
                <label className="block text-slate-400 uppercase font-semibold text-[10px] mb-1.5">
                  Session Inactivity Auto-Timeout
                </label>
                <select
                  value={securityForm.sessionTimeoutMins}
                  onChange={(e) =>
                    setSecurityForm({
                      ...securityForm,
                      sessionTimeoutMins: e.target.value,
                    })
                  }
                  className="w-full sm:w-64 px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                >
                  <option value="30">30 Minutes</option>
                  <option value="60">1 Hour</option>
                  <option value="240">4 Hours</option>
                  <option value="1440">24 Hours</option>
                </select>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white">Two-Factor Authentication (2FA)</h4>
                  <p className="text-[11px] text-slate-400">
                    Require TOTP authenticator code on admin sign-in.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={securityForm.twoFactorEnabled}
                  onChange={(e) =>
                    setSecurityForm({
                      ...securityForm,
                      twoFactorEnabled: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded text-teal-500 focus:ring-teal-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Save Changes Floating Action Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-teal-500/20 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
