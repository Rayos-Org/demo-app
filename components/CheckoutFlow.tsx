"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/data/mock-catalog";
import { walletClient, generateCheckoutXdr } from "@/lib/sdk-client";

interface CheckoutFlowProps {
  product: Product;
}

type Step = "idle" | "signing" | "submitting" | "error";

export function CheckoutFlow({ product }: CheckoutFlowProps) {
  const [step, setStep] = useState<Step>("idle");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCheckout = async () => {
    setStep("signing");
    setError(null);

    try {
      const xdr = await generateCheckoutXdr(product.id, product.priceUSD);
      setStep("submitting");

      const response = await walletClient.signAndSubmit(xdr, {
        challenge: "demo_challenge_hash",
        credentialId: "demo_credential_id",
        userVerification: "preferred",
      });

      if (response.status === "success" || response.status === "pending") {
        router.push(`/receipt/${response.hash || "demo_tx_hash"}`);
      } else {
        setError("Transaction failed. Please try again.");
        setStep("error");
      }
    } catch (err: unknown) {
      console.error("Checkout error:", err);
      const errorMessage = err instanceof Error ? err.message : "Transaction failed. Please try again.";
      setError(errorMessage);
      setStep("error");
    }
  };

  return (
    <div className="bg-[#111] border border-white/10 rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Order Summary</h2>
        <p className="text-gray-500 text-sm">Testnet USDC — no real funds</p>
      </div>

      {/* Product row */}
      <div className="flex items-center justify-between py-4 border-y border-white/8">
        <div>
          <p className="text-white font-medium text-sm">{product.name}</p>
          <p className="text-gray-500 text-xs mt-0.5">Qty: 1</p>
        </div>
        <p className="text-white font-semibold">${product.priceUSD.toFixed(2)}</p>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-sm">Total (USDC)</p>
        <p className="text-2xl font-bold text-white">${product.priceUSD.toFixed(2)}</p>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <button
        onClick={handleCheckout}
        disabled={step === "signing" || step === "submitting"}
        className="w-full h-12 flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/30 hover:shadow-blue-800/50"
      >
        {step === "idle" && (
          <>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 0 1 21.75 8.25Z"/></svg>
            Pay with Passkey
          </>
        )}
        {step === "signing" && (
          <>
            <svg className="animate-spin" width="18" height="18" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            Awaiting passkey...
          </>
        )}
        {step === "submitting" && (
          <>
            <svg className="animate-spin" width="18" height="18" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            Submitting to Stellar...
          </>
        )}
        {step === "error" && "Retry"}
      </button>

      {/* Info */}
      <div className="text-xs text-gray-600 space-y-1.5">
        <div className="flex items-start gap-2">
          <svg className="shrink-0 mt-0.5" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
          One biometric prompt — keys never leave your device
        </div>
        <div className="flex items-start gap-2">
          <svg className="shrink-0 mt-0.5" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
          Gasless — relay backend sponsors XLM fees
        </div>
        <div className="flex items-start gap-2">
          <svg className="shrink-0 mt-0.5" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
          Verifiable — receipt links to Stellar Expert Explorer
        </div>
      </div>
    </div>
  );
}
