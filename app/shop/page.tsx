import { mockCatalog } from "@/data/mock-catalog";
import { ProductCard } from "@/components/ProductCard";

export default function ShopPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Latest Gear</h2>
        <p className="text-gray-500 mt-2">Get the latest developer merch. Pay with crypto.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCatalog.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
