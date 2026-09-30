"use client";

import React, { useState, useMemo } from "react";
import {
  INITIAL_USERS,
  AdminUserRecord,
} from "@/data/adminMockData";
import {
  Search,
  Filter,
  UserPlus,
  Shield,
  Heart,
  Briefcase,
  Users as UsersIcon,
  CheckCircle,
  XCircle,
  Clock,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  Trash2,
  Eye,
  Award,
} from "lucide-react";

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUserRecord[]>(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedUser, setSelectedUser] = useState<AdminUserRecord | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New user form state
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Donor" as AdminUserRecord["role"],
    status: "Active" as AdminUserRecord["status"],
    location: "",
  });

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.phone.includes(searchTerm) ||
        u.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = roleFilter === "All" || u.role === roleFilter;
      const matchesStatus = statusFilter === "All" || u.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  // Aggregate stats
  const totalDonorsCount = users.filter((u) => u.role === "Donor").length;
  const totalVolunteersCount = users.filter((u) => u.role === "Volunteer").length;
  const totalPartnersCount = users.filter((u) => u.role === "Partner").length;
  const totalAdminsCount = users.filter((u) => u.role === "Admin").length;

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    const created: AdminUserRecord = {
      id: `USR-${Math.floor(100 + Math.random() * 900)}`,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone || "+91 98000 00000",
      role: newUser.role,
      status: newUser.status,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80`,
      totalDonated: 0,
      donationsCount: 0,
      joinedDate: new Date().toISOString().split("T")[0],
      location: newUser.location || "India",
    };

    setUsers([created, ...users]);
    setShowAddModal(false);
    setNewUser({
      name: "",
      email: "",
      phone: "",
      role: "Donor",
      status: "Active",
      location: "",
    });
    alert(`User ${created.name} (${created.role}) has been added successfully.`);
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(
      users.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === "Active" ? "Inactive" : "Active";
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  const getRoleBadge = (role: AdminUserRecord["role"]) => {
    switch (role) {
      case "Admin":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-950/60 text-purple-300 border border-purple-500/30">
            <Shield className="w-3 h-3 text-purple-400" /> Admin
          </span>
        );
      case "Donor":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-950/60 text-teal-300 border border-teal-500/30">
            <Heart className="w-3 h-3 text-teal-400" /> Donor
          </span>
        );
      case "Volunteer":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
            <Award className="w-3 h-3 text-emerald-400" /> Volunteer
          </span>
        );
      case "Partner":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-950/60 text-blue-300 border border-blue-500/30">
            <Briefcase className="w-3 h-3 text-blue-400" /> Partner / CSR
          </span>
        );
    }
  };

  const getStatusBadge = (status: AdminUserRecord["status"]) => {
    switch (status) {
      case "Active":
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-950/40 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active
          </span>
        );
      case "Inactive":
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-800 text-slate-400 border border-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" /> Inactive
          </span>
        );
      case "Suspended":
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-red-950/50 text-red-400 border border-red-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> Suspended
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            User & Community Directory
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage donors, volunteers, CSR partners, and internal foundation administrators.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-teal-500/20 cursor-pointer self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Member</span>
        </button>
      </div>

      {/* Role Distribution Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Donors
            </span>
            <h3 className="text-2xl font-bold text-teal-300 font-mono mt-1">
              {totalDonorsCount}
            </h3>
          </div>
          <div className="p-2.5 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-xl">
            <Heart className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Volunteers
            </span>
            <h3 className="text-2xl font-bold text-emerald-300 font-mono mt-1">
              {totalVolunteersCount}
            </h3>
          </div>
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
            <Award className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              CSR Partners
            </span>
            <h3 className="text-2xl font-bold text-blue-300 font-mono mt-1">
              {totalPartnersCount}
            </h3>
          </div>
          <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl">
            <Briefcase className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Admins
            </span>
            <h3 className="text-2xl font-bold text-purple-300 font-mono mt-1">
              {totalAdminsCount}
            </h3>
          </div>
          <div className="p-2.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl">
            <Shield className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, city..."
            className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
            >
              <option value="All">All Roles</option>
              <option value="Donor">Donors</option>
              <option value="Volunteer">Volunteers</option>
              <option value="Partner">CSR Partners</option>
              <option value="Admin">Admins</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>

          {(searchTerm || roleFilter !== "All" || statusFilter !== "All") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setRoleFilter("All");
                setStatusFilter("All");
              }}
              className="text-xs text-teal-400 hover:text-teal-300 px-2 py-1 underline cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-800/60 text-slate-400 border-b border-slate-800 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">Member</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Total Contributed</th>
                <th className="py-3.5 px-4">Joined Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 text-sm">
                    No members found matching the specified filters.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr
                    key={u.id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-white group-hover:text-teal-300 transition-colors">
                            {u.name}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">{u.id}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">{getRoleBadge(u.role)}</td>

                    <td className="py-3.5 px-4">
                      <div className="text-slate-200 font-mono text-[11px]">{u.email}</div>
                      <div className="text-[10px] text-slate-400">{u.phone}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-slate-300 text-[11px]">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <span>{u.location}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {u.totalDonated > 0 ? (
                        <div>
                          <span className="font-bold text-emerald-400 font-mono text-xs">
                            ₹{u.totalDonated.toLocaleString("en-IN")}
                          </span>
                          <span className="text-[10px] text-slate-400 block font-mono">
                            {u.donationsCount} contribution{u.donationsCount > 1 ? "s" : ""}
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400 font-mono">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                      {u.joinedDate}
                    </td>

                    <td className="py-3.5 px-4">{getStatusBadge(u.status)}</td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedUser(u)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="View Profile Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(u.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
                          title="Toggle Status (Active / Inactive)"
                        >
                          <Clock className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-800/40 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>
            Total <strong className="text-white">{filteredUsers.length}</strong> directory entries displayed
          </span>
          <span className="text-[11px] font-mono">Real-time sync active</span>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h4 className="font-bold text-white text-base">Member Profile</h4>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 text-slate-950 font-bold text-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{selectedUser.name}</h3>
                  <div className="mt-1 flex items-center gap-2">
                    {getRoleBadge(selectedUser.role)}
                    {getStatusBadge(selectedUser.status)}
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 pt-1">
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">User ID:</span>
                  <span className="text-teal-300 font-mono font-semibold">{selectedUser.id}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Email:</span>
                  <span className="text-slate-200 font-mono">{selectedUser.email}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Phone:</span>
                  <span className="text-slate-200">{selectedUser.phone}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Location:</span>
                  <span className="text-slate-200">{selectedUser.location}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Lifetime Contribution:</span>
                  <span className="text-emerald-400 font-bold font-mono text-sm">
                    ₹{selectedUser.totalDonated.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Total Transactions:</span>
                  <span className="text-slate-200 font-mono">{selectedUser.donationsCount}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Registered On:</span>
                  <span className="text-slate-200 font-mono">{selectedUser.joinedDate}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex gap-3">
              <button
                onClick={() => {
                  handleToggleStatus(selectedUser.id);
                  setSelectedUser(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors cursor-pointer"
              >
                Toggle Status
              </button>
              <button
                onClick={() => {
                  alert(`Direct communication link generated for ${selectedUser.email}`);
                  setSelectedUser(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Email</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h4 className="font-bold text-white text-base">Add New Directory Member</h4>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4 py-4 text-xs">
              <div>
                <label className="block text-slate-400 uppercase font-semibold text-[10px] mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="e.g. Ramesh Chandra"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 uppercase font-semibold text-[10px] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="user@example.com"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 uppercase font-semibold text-[10px] mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    placeholder="+91 98000 00000"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 uppercase font-semibold text-[10px] mb-1.5">
                    Role
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) =>
                      setNewUser({ ...newUser, role: e.target.value as any })
                    }
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                  >
                    <option value="Donor">Donor</option>
                    <option value="Volunteer">Volunteer</option>
                    <option value="Partner">CSR Partner</option>
                    <option value="Admin">Administrator</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 uppercase font-semibold text-[10px] mb-1.5">
                    Location (City / State)
                  </label>
                  <input
                    type="text"
                    value={newUser.location}
                    onChange={(e) => setNewUser({ ...newUser, location: e.target.value })}
                    placeholder="e.g. Hyderabad, Telangana"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors shadow-md shadow-teal-500/20 cursor-pointer"
                >
                  Create Member Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
