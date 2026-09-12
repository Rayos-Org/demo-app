"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/data/mock-catalog";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
      className="group flex flex-col bg-[#111] hover:bg-[#161616] border border-white/8 hover:border-white/15 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden bg-[#1a1a1a]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="text-xs backdrop-blur-sm bg-black/50 border-white/10 text-gray-300">
            USDC
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-semibold text-white text-base mb-1 leading-snug">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-5 flex-1 leading-relaxed">{product.description}</p>

        <div className="flex items-center justify-between mt-auto">
          <div className="min-w-0 pr-2 truncate">
            <span className="text-2xl font-bold text-white">${product.priceUSD.toFixed(2)}</span>
            <span className="text-xs text-gray-500 ml-1 hidden sm:inline-block">USDC</span>
          </div>
          <Link
            href={`/checkout/${product.id}`}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-900/40 whitespace-nowrap shrink-0"
          >
            Buy Now
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
