import Link from "next/link";
import { Product } from "@/data/mock-catalog";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
        {/* We use standard img here for demo simplicity with external URLs, 
            but for a real app, Next.js Image with configured domains is better. */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg text-gray-900 mb-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4 flex-grow">{product.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-bold text-lg">${product.priceUSD.toFixed(2)}</span>
          <Link
            href={`/checkout/${product.id}`}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 outline-none"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
}
