import { mockCatalog } from "@/data/mock-catalog";
import { ProductCard } from "@/components/ProductCard";

export default function ShopPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">Demo Catalog</p>
        <h1 className="text-4xl font-bold text-white mb-3">Developer Gear</h1>
        <p className="text-gray-400 max-w-lg">
          Pick any item and experience a gasless, passkey-signed checkout on Stellar Testnet.
          Each payment is settled on-chain in seconds.
        </p>
      </div>

      {/* Info bar */}
      <div className="flex flex-wrap items-center gap-3 mb-8 p-4 bg-blue-600/8 border border-blue-500/15 rounded-xl">
        <div className="flex items-center gap-2 text-blue-400 text-sm">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/></svg>
          Prices are denominated in USDC on Stellar Testnet. No real money is used.
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {mockCatalog.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </div>
  );
}
