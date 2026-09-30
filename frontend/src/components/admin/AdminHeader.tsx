"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { INITIAL_ACTIVITIES } from "@/data/adminMockData";
import {
  Menu,
  Bell,
  Search,
  LogOut,
  Settings,
  User,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

interface AdminHeaderProps {
  onToggleSidebar: () => void;
}

export default function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getPageTitle = () => {
    if (pathname.startsWith("/admin/payments")) return "Payments & Transactions";
    if (pathname.startsWith("/admin/users")) return "User & Donor Directory";
    if (pathname.startsWith("/admin/settings")) return "System & Portal Settings";
    return "Operations Dashboard";
  };

  const getBreadcrumb = () => {
    if (pathname.startsWith("/admin/payments")) return "Payments";
    if (pathname.startsWith("/admin/users")) return "Users";
    if (pathname.startsWith("/admin/settings")) return "Settings";
    return "Overview";
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-30 h-20 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between transition-all">
      {/* Left side: Hamburger on mobile + Title & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <span>Admin</span>
            <span>/</span>
            <span className="text-teal-400 font-semibold">{getBreadcrumb()}</span>
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            {getPageTitle()}
          </h1>
        </div>
      </div>

      {/* Right side: Search bar + Notification + User profile dropdown */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Quick search records..."
            className="w-48 lg:w-64 pl-9 pr-4 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:w-72 transition-all"
          />
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="relative p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-400 ring-2 ring-slate-900 animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-black/80 p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">Notifications</h4>
                  <span className="text-[10px] bg-teal-500/20 text-teal-300 font-semibold px-2 py-0.5 rounded-full border border-teal-500/30">
                    Live
                  </span>
                </div>
                <span className="text-xs text-teal-400 hover:underline cursor-pointer">
                  Mark all read
                </span>
              </div>

              <div className="space-y-3 max-h-72 overflow-y-auto no-scrollbar">
                {INITIAL_ACTIVITIES.slice(0, 4).map((act) => (
                  <div
                    key={act.id}
                    className="p-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors flex items-start gap-3 text-xs"
                  >
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-200 truncate">
                        {act.title}
                      </p>
                      <p className="text-slate-400 text-[11px] line-clamp-1">
                        {act.description}
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1 block font-mono">
                        {act.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-teal-500 to-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0">
              A
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-white leading-tight">
                {user?.name || "Administrator"}
              </p>
              <p className="text-[10px] text-slate-400 font-mono leading-tight">
                Admin
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-3 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-black/80 p-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-2.5 border-b border-slate-800 mb-1">
                <p className="text-xs font-bold text-white">
                  {user?.name || "Administrator"}
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  {user?.email || "admin@mealtosmile.org"}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-emerald-400 mt-1 font-medium">
                  <CheckCircle2 className="w-3 h-3" /> Hardcoded Auth Active
                </div>
              </div>

              <button
                onClick={() => {
                  setShowUserMenu(false);
                  router.push("/admin/settings");
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5 text-slate-400" />
                <span>Admin Settings</span>
              </button>

              <button
                onClick={() => {
                  setShowUserMenu(false);
                  router.push("/admin/users");
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Manage Users</span>
              </button>

              <div className="border-t border-slate-800 my-1"></div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
