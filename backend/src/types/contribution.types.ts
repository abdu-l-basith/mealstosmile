export interface ContributionInput {
  name: string;
  whatsapp: string;
  email?: string;
  amount?: string;
  message?: string;
  cause?: string;
  source?: string;
}

export interface ContributionDocument extends ContributionInput {
  id?: string;
  createdAt: Date | string;
  status: "pending" | "contacted" | "completed" | "archived";
  formattedAmount: string;
  submittedAtIST: string;
}
