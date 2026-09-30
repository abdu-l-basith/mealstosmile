export interface AdminStats {
  totalRevenue: number;
  revenueGrowth: number;
  totalDonors: number;
  donorGrowth: number;
  activeProjects: number;
  completedProjects: number;
  mealsServed: number;
  mealsGrowth: number;
}

export interface MonthlyChartData {
  month: string;
  raised: number;
  target: number;
  meals: number;
}

export interface PaymentTransaction {
  id: string;
  receiptNumber: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  cause: string;
  amount: number;
  currency: string;
  paymentMethod: "UPI" | "Credit Card" | "Debit Card" | "Net Banking" | "Razorpay" | "Bank Transfer";
  status: "Completed" | "Pending" | "Failed" | "Refunded";
  date: string;
  time: string;
  panNumber?: string;
  notes?: string;
}

export interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "Donor" | "Volunteer" | "Admin" | "Partner";
  avatar: string;
  status: "Active" | "Inactive" | "Suspended";
  totalDonated: number;
  donationsCount: number;
  joinedDate: string;
  location: string;
}

export interface AdminActivity {
  id: string;
  type: "donation" | "user" | "project" | "system";
  title: string;
  description: string;
  timestamp: string;
  iconBg: string;
}

export const INITIAL_ADMIN_STATS: AdminStats = {
  totalRevenue: 2845600,
  revenueGrowth: 18.4,
  totalDonors: 1482,
  donorGrowth: 12.3,
  activeProjects: 6,
  completedProjects: 4,
  mealsServed: 142500,
  mealsGrowth: 22.8,
};

export const MONTHLY_DONATION_DATA: MonthlyChartData[] = [
  { month: "Jan", raised: 185000, target: 150000, meals: 9200 },
  { month: "Feb", raised: 210000, target: 180000, meals: 10500 },
  { month: "Mar", raised: 195000, target: 200000, meals: 9800 },
  { month: "Apr", raised: 260000, target: 220000, meals: 13000 },
  { month: "May", raised: 310000, target: 250000, meals: 15500 },
  { month: "Jun", raised: 280000, target: 250000, meals: 14000 },
  { month: "Jul", raised: 340000, target: 300000, meals: 17000 },
  { month: "Aug", raised: 420000, target: 350000, meals: 21000 },
  { month: "Sep", raised: 390000, target: 350000, meals: 19500 },
  { month: "Oct", raised: 455600, target: 400000, meals: 22800 },
];

export const CAUSES_LIST = [
  "Meals to Smile",
  "SACREd Learning Academy",
  "Rural Healthcare Aid",
  "Clean Water Initiative",
  "Elderly Nutrition Program",
  "General Relief Fund",
];

export const INITIAL_PAYMENTS: PaymentTransaction[] = [
  {
    id: "TXN-98421",
    receiptNumber: "REC-2026-0984",
    donorName: "Dr. Ananya Iyer",
    donorEmail: "ananya.iyer@gmail.com",
    donorPhone: "+91 98450 12345",
    cause: "Meals to Smile",
    amount: 15000,
    currency: "INR",
    paymentMethod: "UPI",
    status: "Completed",
    date: "2026-09-30",
    time: "18:42",
    panNumber: "ABCDE1234F",
    notes: "Sponsored 300 meals for the primary school drive.",
  },
  {
    id: "TXN-98420",
    receiptNumber: "REC-2026-0983",
    donorName: "Rajesh Kumar Verma",
    donorEmail: "rajesh.verma@techcorp.in",
    donorPhone: "+91 98201 88471",
    cause: "SACREd Learning Academy",
    amount: 50000,
    currency: "INR",
    paymentMethod: "Credit Card",
    status: "Completed",
    date: "2026-09-30",
    time: "16:15",
    panNumber: "BHYPK9921Z",
    notes: "Annual digital classroom sponsorship.",
  },
  {
    id: "TXN-98419",
    receiptNumber: "REC-2026-0982",
    donorName: "Sneha Mukherjee",
    donorEmail: "sneha.m@outlook.com",
    donorPhone: "+91 94331 55620",
    cause: "Clean Water Initiative",
    amount: 5000,
    currency: "INR",
    paymentMethod: "Razorpay",
    status: "Completed",
    date: "2026-09-29",
    time: "21:04",
    panNumber: "CKLPM4810M",
    notes: "Water filter installation contribution.",
  },
  {
    id: "TXN-98418",
    receiptNumber: "REC-2026-0981",
    donorName: "Vikram Malhotra",
    donorEmail: "vikram.m@zenith.co",
    donorPhone: "+91 98110 74321",
    cause: "Meals to Smile",
    amount: 10000,
    currency: "INR",
    paymentMethod: "Net Banking",
    status: "Completed",
    date: "2026-09-29",
    time: "14:22",
    panNumber: "APLMQ3302K",
    notes: "In memory of Late Shri R. K. Malhotra.",
  },
  {
    id: "TXN-98417",
    receiptNumber: "REC-2026-0980",
    donorName: "Pooja Hegde",
    donorEmail: "pooja.hegde@gmail.com",
    donorPhone: "+91 97400 90123",
    cause: "Elderly Nutrition Program",
    amount: 2500,
    currency: "INR",
    paymentMethod: "UPI",
    status: "Pending",
    date: "2026-09-29",
    time: "11:50",
    notes: "UPI payment confirmation awaited from bank.",
  },
  {
    id: "TXN-98416",
    receiptNumber: "REC-2026-0979",
    donorName: "Sanjay Singhania",
    donorEmail: "sanjay.s@apexgroup.com",
    donorPhone: "+91 98300 45678",
    cause: "Rural Healthcare Aid",
    amount: 100000,
    currency: "INR",
    paymentMethod: "Bank Transfer",
    status: "Completed",
    date: "2026-09-28",
    time: "17:30",
    panNumber: "AAECS9901R",
    notes: "Mobile medical clinic supplies sponsorship.",
  },
  {
    id: "TXN-98415",
    receiptNumber: "REC-2026-0978",
    donorName: "Meera Nair",
    donorEmail: "meera.nair@hotmail.com",
    donorPhone: "+91 94471 22890",
    cause: "General Relief Fund",
    amount: 3000,
    currency: "INR",
    paymentMethod: "Debit Card",
    status: "Completed",
    date: "2026-09-28",
    time: "10:14",
    panNumber: "DFGPM7712J",
    notes: "Monthly recurring contribution.",
  },
  {
    id: "TXN-98414",
    receiptNumber: "REC-2026-0977",
    donorName: "Karthik Ranganathan",
    donorEmail: "karthik.r@proton.me",
    donorPhone: "+91 99001 33445",
    cause: "Meals to Smile",
    amount: 1500,
    currency: "INR",
    paymentMethod: "UPI",
    status: "Failed",
    date: "2026-09-27",
    time: "19:28",
    notes: "Transaction timed out on bank server.",
  },
  {
    id: "TXN-98413",
    receiptNumber: "REC-2026-0976",
    donorName: "Farhan Siddiqui",
    donorEmail: "farhan.siddiqui@gmail.com",
    donorPhone: "+91 98920 11223",
    cause: "SACREd Learning Academy",
    amount: 12000,
    currency: "INR",
    paymentMethod: "UPI",
    status: "Completed",
    date: "2026-09-27",
    time: "15:40",
    panNumber: "ASDFG4567H",
    notes: "Books and stationery kit donation for 40 students.",
  },
  {
    id: "TXN-98412",
    receiptNumber: "REC-2026-0975",
    donorName: "Sunita Deshmukh",
    donorEmail: "sunita.deshmukh@yahoo.com",
    donorPhone: "+91 98220 77665",
    cause: "Meals to Smile",
    amount: 6000,
    currency: "INR",
    paymentMethod: "Razorpay",
    status: "Refunded",
    date: "2026-09-26",
    time: "12:10",
    notes: "Accidental double transaction refund processed.",
  },
];

export const INITIAL_USERS: AdminUserRecord[] = [
  {
    id: "USR-001",
    name: "Dr. Ananya Iyer",
    email: "ananya.iyer@gmail.com",
    phone: "+91 98450 12345",
    role: "Donor",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    status: "Active",
    totalDonated: 125000,
    donationsCount: 14,
    joinedDate: "2024-03-12",
    location: "Bengaluru, Karnataka",
  },
  {
    id: "USR-002",
    name: "Rajesh Kumar Verma",
    email: "rajesh.verma@techcorp.in",
    phone: "+91 98201 88471",
    role: "Partner",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    status: "Active",
    totalDonated: 450000,
    donationsCount: 8,
    joinedDate: "2023-11-05",
    location: "Mumbai, Maharashtra",
  },
  {
    id: "USR-003",
    name: "Priya Sharma",
    email: "priya.sharma@sacredlearning.org",
    phone: "+91 98112 33445",
    role: "Admin",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    status: "Active",
    totalDonated: 0,
    donationsCount: 0,
    joinedDate: "2023-01-15",
    location: "New Delhi, Delhi",
  },
  {
    id: "USR-004",
    name: "Rohan Kulkarni",
    email: "rohan.k@volunteerhub.in",
    phone: "+91 97654 11223",
    role: "Volunteer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    status: "Active",
    totalDonated: 8500,
    donationsCount: 3,
    joinedDate: "2025-02-18",
    location: "Pune, Maharashtra",
  },
  {
    id: "USR-005",
    name: "Sneha Mukherjee",
    email: "sneha.m@outlook.com",
    phone: "+91 94331 55620",
    role: "Donor",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    status: "Active",
    totalDonated: 34000,
    donationsCount: 6,
    joinedDate: "2024-07-22",
    location: "Kolkata, West Bengal",
  },
  {
    id: "USR-006",
    name: "Vikram Malhotra",
    email: "vikram.m@zenith.co",
    phone: "+91 98110 74321",
    role: "Donor",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80",
    status: "Active",
    totalDonated: 78000,
    donationsCount: 9,
    joinedDate: "2024-05-19",
    location: "Gurugram, Haryana",
  },
  {
    id: "USR-007",
    name: "Sanjay Singhania",
    email: "sanjay.s@apexgroup.com",
    phone: "+91 98300 45678",
    role: "Partner",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
    status: "Active",
    totalDonated: 300000,
    donationsCount: 5,
    joinedDate: "2023-08-30",
    location: "Hyderabad, Telangana",
  },
  {
    id: "USR-008",
    name: "Arjun Nambiar",
    email: "arjun.n@sacrednat.org",
    phone: "+91 99460 88990",
    role: "Volunteer",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
    status: "Inactive",
    totalDonated: 2000,
    donationsCount: 1,
    joinedDate: "2024-10-10",
    location: "Kochi, Kerala",
  },
];

export const INITIAL_ACTIVITIES: AdminActivity[] = [
  {
    id: "act-1",
    type: "donation",
    title: "New High-Value Donation Received",
    description: "Dr. Ananya Iyer contributed ₹15,000 to Meals to Smile",
    timestamp: "12 minutes ago",
    iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  {
    id: "act-2",
    type: "user",
    title: "New Volunteer Enrolled",
    description: "Rohan Kulkarni registered for the Pune Weekend Food Drive",
    timestamp: "1 hour ago",
    iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  {
    id: "act-3",
    type: "project",
    title: "Milestone Accomplished",
    description: "SACREd Learning Academy reached 85% of its quarterly funding goal",
    timestamp: "3 hours ago",
    iconBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  {
    id: "act-4",
    type: "donation",
    title: "Payment Receipt Dispatched",
    description: "80G Tax exemption receipt emailed to Rajesh Kumar Verma (₹50,000)",
    timestamp: "5 hours ago",
    iconBg: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  },
  {
    id: "act-5",
    type: "system",
    title: "Monthly Backup Completed",
    description: "Secure automated database backup & audit trail synced",
    timestamp: "Yesterday",
    iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
];
