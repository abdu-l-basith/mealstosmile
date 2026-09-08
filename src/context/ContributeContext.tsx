"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface ContributeOptions {
  cause?: string;
  amount?: string;
  source?: string;
}

interface ContributeContextType {
  isOpen: boolean;
  options: ContributeOptions;
  openContribute: (options?: ContributeOptions) => void;
  closeContribute: () => void;
}

const ContributeContext = createContext<ContributeContextType | undefined>(undefined);

export function ContributeProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ContributeOptions>({
    cause: "General Contribution",
    amount: "",
  });

  const openContribute = (newOptions?: ContributeOptions) => {
    const opts = {
      cause: newOptions?.cause || "General Contribution",
      amount: newOptions?.amount || "",
      source: newOptions?.source || "Website",
    };

    if (typeof window !== "undefined") {
      // In small devices (< 768px), open the form in a new tab as requested
      const isSmallScreen = window.innerWidth < 768;
      if (isSmallScreen) {
        const params = new URLSearchParams();
        if (opts.cause) params.set("cause", opts.cause);
        if (opts.amount) params.set("amount", opts.amount);
        if (opts.source) params.set("source", opts.source);
        const url = `/contribute?${params.toString()}`;
        window.open(url, "_blank");
        return;
      }
    }

    // In big screens (>= 768px), open the modal
    setOptions(opts);
    setIsOpen(true);
  };

  const closeContribute = () => {
    setIsOpen(false);
  };

  return (
    <ContributeContext.Provider
      value={{
        isOpen,
        options,
        openContribute,
        closeContribute,
      }}
    >
      {children}
    </ContributeContext.Provider>
  );
}

export function useContribute() {
  const context = useContext(ContributeContext);
  if (!context) {
    throw new Error("useContribute must be used within a ContributeProvider");
  }
  return context;
}
