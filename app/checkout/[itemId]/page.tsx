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

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <Link href="/shop" className="text-blue-600 hover:underline text-sm flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to Shop
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Product Details Column */}
        <div>
          <div className="bg-gray-100 rounded-xl overflow-hidden mb-6 h-64 relative">
            <Image 
              src={product.image} 
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover w-full h-full"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
        </div>

        {/* Checkout Flow Column */}
        <div>
          <CheckoutFlow product={product} />
          
          <div className="mt-8 text-sm text-gray-500 bg-blue-50 p-4 rounded-lg border border-blue-100">
            <p className="font-semibold text-blue-900 mb-1">How this works</p>
            <ul className="list-disc pl-4 space-y-1 text-blue-800">
              <li>Clicking &quot;Pay with Passkey&quot; invokes your device&apos;s biometric sensor.</li>
              <li>A transaction is signed locally—no private keys are transmitted.</li>
              <li>The SDK submits the signed XDR to the network relay.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
