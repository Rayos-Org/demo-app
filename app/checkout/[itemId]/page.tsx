import { notFound } from "next/navigation";
import { getProduct } from "@/data/mock-catalog";
import { CheckoutFlow } from "@/components/CheckoutFlow";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
  params: Promise<{ itemId: string }>;
}

export default async function CheckoutPage({ params }: PageProps) {
  const { itemId } = await params;
  const product = getProduct(itemId);

  if (!product) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Back */}
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm mb-6 sm:mb-10"
      >
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/></svg>
        Back to shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* Left: product */}
        <div>
          <div className="relative h-72 w-full rounded-2xl overflow-hidden bg-[#1a1a1a] mb-6">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">{product.name}</h1>
          <p className="text-gray-400 leading-relaxed mb-6">{product.description}</p>

          {/* Trust signals */}
          <div className="space-y-2">
            {[
              "Settled on Stellar Testnet Soroban",
              "Gasless — relay pays XLM fees",
              "Non-custodial — keys never leave device",
              "On-chain proof on receipt",
            ].map((t) => (
              <div key={t} className="flex items-center gap-2.5 text-sm text-gray-500">
                <svg className="shrink-0 text-green-500" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Right: checkout */}
        <div>
          <CheckoutFlow product={product} />
        </div>
      </div>
    </div>
  );
}
