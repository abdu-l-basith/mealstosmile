import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ContributeProvider } from "@/context/ContributeContext";
import { AuthProvider } from "@/context/AuthContext";
import ContributeModal from "@/components/ContributeModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mealtosmile.org"),
  title: "Meal to Smile",
  description: "Empowering rural communities in India through nutrition, education, and dignity. Support our projects including Meals to Smile, SACREd Learning Academy, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col">
        <AuthProvider>
          <ContributeProvider>
            {children}
            <ContributeModal />
          </ContributeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
