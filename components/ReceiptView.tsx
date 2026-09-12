"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface ReceiptViewProps {
  txHash: string;
}

export function ReceiptView({ txHash }: ReceiptViewProps) {
  const explorerUrl = `https://stellar.expert/explorer/testnet/tx/${txHash}`;
  const shortHash =
    txHash.length > 24
      ? `${txHash.substring(0, 12)}...${txHash.substring(txHash.length - 12)}`
      : txHash;

  const copyHash = () => {
    navigator.clipboard.writeText(txHash).catch(() => {});
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-[#111] border border-white/10 rounded-2xl p-6 sm:p-8 max-w-lg w-full mx-auto text-center"
    >
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 14 }}
        className="mx-auto w-16 h-16 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center mb-6"
      >
        <motion.svg
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="w-8 h-8 text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <motion.path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </motion.svg>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="text-3xl font-bold text-white mb-2"
      >
        Payment Confirmed
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="text-gray-400 mb-8"
      >
        Your gasless passkey payment was settled on Stellar Testnet.
      </motion.p>

      {/* Tx hash */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="bg-[#0d0d0d] border border-white/8 rounded-xl p-5 text-left mb-6 space-y-4"
      >
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Transaction Hash</p>
          <div className="flex items-center gap-2">
            <code className="font-mono text-sm text-gray-300 break-all flex-1">{shortHash}</code>
            <button
              onClick={copyHash}
              title="Copy full hash"
              className="shrink-0 text-gray-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/8"
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"/></svg>
            </button>
          </div>
        </div>

        <div className="border-t border-white/8 pt-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">On-chain Verification</p>
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"/></svg>
            View on Stellar Expert Testnet
            <svg className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"/></svg>
          </a>
          <p className="text-xs text-gray-600 mt-2">
            This is verifiable on-chain proof that the payment settled without any third-party custody.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 w-full justify-center bg-white/8 hover:bg-white/12 border border-white/10 hover:border-white/20 text-white font-medium py-3 rounded-xl transition-all duration-200"
        >
          Back to Shop
        </Link>
      </motion.div>
    </motion.div>
  );
}
