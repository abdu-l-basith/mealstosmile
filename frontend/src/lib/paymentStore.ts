import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import fs from "fs/promises";
import path from "path";
import {
  PaymentTransaction,
  AdminActivity,
  AdminStats,
  MonthlyChartData,
  CAUSES_LIST,
} from "@/data/adminMockData";

const DATA_DIR = path.join(process.cwd(), "data");
const PAYMENTS_BACKUP_FILE = path.join(DATA_DIR, "payments.json");

// Helper to ensure data directory exists for local fallback/cache
async function ensureDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {}
}

export class PaymentStore {
  /**
   * Get all payments from Firestore (real data only, no dummy data)
   */
  static async getAllPayments(): Promise<PaymentTransaction[]> {
    try {
      const paymentsRef = collection(db, "payments");
      const q = query(paymentsRef, orderBy("createdAt", "desc"), limit(100));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const payments: PaymentTransaction[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          payments.push({
            id: data.id || doc.id,
            receiptNumber: data.receiptNumber || `REC-${doc.id.slice(0, 6)}`,
            donorName: data.donorName || "Anonymous Donor",
            donorEmail: data.donorEmail || "",
            donorPhone: data.donorPhone || "",
            cause: data.cause || "General Contribution",
            amount: Number(data.amount) || 0,
            currency: data.currency || "INR",
            paymentMethod: data.paymentMethod || "Razorpay",
            status: data.status || "Completed",
            date: data.date || new Date().toISOString().split("T")[0],
            time: data.time || new Date().toTimeString().slice(0, 5),
            panNumber: data.panNumber,
            notes: data.notes,
          });
        });

        // Backup to local file for resilience
        await ensureDir();
        await fs.writeFile(PAYMENTS_BACKUP_FILE, JSON.stringify(payments, null, 2), "utf-8");

        return payments;
      }
    } catch (err) {
      console.warn("[Firestore] Could not fetch payments, checking local store:", err);
      try {
        await ensureDir();
        const content = await fs.readFile(PAYMENTS_BACKUP_FILE, "utf-8");
        return JSON.parse(content) as PaymentTransaction[];
      } catch {
        return [];
      }
    }

    return [];
  }

  /**
   * Add a new payment directly to Firestore database
   */
  static async addPayment(input: {
    id?: string;
    receiptNumber?: string;
    donorName: string;
    donorEmail?: string;
    donorPhone?: string;
    cause?: string;
    amount: number;
    currency?: string;
    paymentMethod?: PaymentTransaction["paymentMethod"];
    status?: PaymentTransaction["status"];
    notes?: string;
    panNumber?: string;
    date?: string;
    time?: string;
  }): Promise<PaymentTransaction> {
    const now = new Date();
    const dateStr =
      input.date ||
      now.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }); // YYYY-MM-DD
    const timeStr =
      input.time ||
      now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

    const newPayment: PaymentTransaction = {
      id: input.id || `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      receiptNumber:
        input.receiptNumber ||
        `REC-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      donorName: input.donorName || "Anonymous Donor",
      donorEmail: input.donorEmail || "",
      donorPhone: input.donorPhone || "",
      cause: input.cause || "General Contribution",
      amount: Number(input.amount) || 0,
      currency: input.currency || "INR",
      paymentMethod: input.paymentMethod || "Razorpay",
      status: input.status || "Completed",
      date: dateStr,
      time: timeStr,
      panNumber: input.panNumber,
      notes: input.notes,
    };

    // 1. Save to Firestore collection "payments"
    try {
      const paymentsRef = collection(db, "payments");
      await addDoc(paymentsRef, {
        ...newPayment,
        createdAt: serverTimestamp(),
      });
      console.log(`[Firestore] Successfully saved payment ${newPayment.id} (₹${newPayment.amount})`);
    } catch (err) {
      console.error("[Firestore] Error writing payment to Firestore:", err);
    }

    // 2. Save Activity Log to Firestore
    if (newPayment.status === "Completed") {
      try {
        const activitiesRef = collection(db, "activities");
        await addDoc(activitiesRef, {
          type: "donation",
          title: "Online Donation Received",
          description: `${newPayment.donorName} contributed ₹${newPayment.amount.toLocaleString("en-IN")} for ${newPayment.cause}`,
          timestamp: "Just now",
          iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          createdAt: serverTimestamp(),
        });
      } catch (e) {
        console.error("[Firestore] Error logging activity to Firestore:", e);
      }
    }

    // Also update local file backup
    try {
      await ensureDir();
      let current: PaymentTransaction[] = [];
      try {
        const content = await fs.readFile(PAYMENTS_BACKUP_FILE, "utf-8");
        current = JSON.parse(content);
      } catch {}
      current.unshift(newPayment);
      await fs.writeFile(PAYMENTS_BACKUP_FILE, JSON.stringify(current, null, 2), "utf-8");
    } catch {}

    return newPayment;
  }

  /**
   * Get all live activities from Firestore
   */
  static async getActivities(): Promise<AdminActivity[]> {
    try {
      const activitiesRef = collection(db, "activities");
      const q = query(activitiesRef, orderBy("createdAt", "desc"), limit(20));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const activities: AdminActivity[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          activities.push({
            id: doc.id,
            type: data.type || "system",
            title: data.title || "Activity Event",
            description: data.description || "",
            timestamp: data.timestamp || "Recently",
            iconBg: data.iconBg || "bg-teal-500/10 text-teal-400 border-teal-500/20",
          });
        });
        return activities;
      }
    } catch (err) {
      console.warn("[Firestore] Error fetching activities:", err);
    }

    return [];
  }

  /**
   * Dynamically calculate dashboard statistics from Firestore data
   */
  static async getDynamicStats(): Promise<{
    stats: AdminStats;
    monthlyData: MonthlyChartData[];
    recentPayments: PaymentTransaction[];
    recentActivities: AdminActivity[];
    causesBreakdown: { cause: string; total: number; percentage: number }[];
    totalTransactionsCount: number;
    completedTransactionsCount: number;
  }> {
    const payments = await this.getAllPayments();
    const activities = await this.getActivities();

    const completedPayments = payments.filter((p) => p.status === "Completed");

    // Dynamic Total Revenue from real transactions only
    const totalRevenue = completedPayments.reduce((acc, curr) => acc + curr.amount, 0);

    // Unique Donors from real transactions
    const uniqueDonorsSet = new Set<string>();
    completedPayments.forEach((p) => {
      const identifier = p.donorEmail?.trim() || p.donorPhone?.trim() || p.donorName?.trim();
      if (identifier) {
        uniqueDonorsSet.add(identifier.toLowerCase());
      }
    });
    const totalDonors = uniqueDonorsSet.size;

    // Real meals distributed calculated directly from received contributions (~₹20/meal)
    const mealsServed = totalRevenue > 0 ? Math.floor(totalRevenue / 20) : 0;

    // Monthly Chart calculation based purely on real records
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyMap: Record<string, { raised: number; target: number; meals: number }> = {};

    // Initialize 12 months with 0
    monthNames.forEach((m) => {
      monthlyMap[m] = { raised: 0, target: 100000, meals: 0 };
    });

    completedPayments.forEach((p) => {
      if (p.date) {
        const d = new Date(p.date);
        if (!isNaN(d.getTime())) {
          const monthKey = monthNames[d.getMonth()];
          if (monthlyMap[monthKey]) {
            monthlyMap[monthKey].raised += p.amount;
            monthlyMap[monthKey].meals += Math.floor(p.amount / 20);
          }
        }
      }
    });

    const monthlyData: MonthlyChartData[] = monthNames.map((month) => ({
      month,
      raised: monthlyMap[month].raised,
      target: monthlyMap[month].target,
      meals: monthlyMap[month].meals,
    }));

    // Dynamic Cause Breakdown based purely on real records
    const causeTotals: Record<string, number> = {};
    CAUSES_LIST.forEach((c) => (causeTotals[c] = 0));

    completedPayments.forEach((p) => {
      const cause = p.cause || "General Contribution";
      causeTotals[cause] = (causeTotals[cause] || 0) + p.amount;
    });

    const totalForCauses = Object.values(causeTotals).reduce((a, b) => a + b, 0);
    const causesBreakdown = Object.entries(causeTotals).map(([cause, total]) => ({
      cause,
      total,
      percentage: totalForCauses > 0 ? Math.round((total / totalForCauses) * 100) : 0,
    }));

    const stats: AdminStats = {
      totalRevenue,
      revenueGrowth: totalRevenue > 0 ? 100 : 0,
      totalDonors,
      donorGrowth: totalDonors > 0 ? 100 : 0,
      activeProjects: 6,
      completedProjects: 0,
      mealsServed,
      mealsGrowth: mealsServed > 0 ? 100 : 0,
    };

    return {
      stats,
      monthlyData,
      recentPayments: payments.slice(0, 6),
      recentActivities: activities.slice(0, 6),
      causesBreakdown,
      totalTransactionsCount: payments.length,
      completedTransactionsCount: completedPayments.length,
    };
  }
}
