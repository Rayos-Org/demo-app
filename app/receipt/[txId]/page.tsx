import { ReceiptView } from "@/components/ReceiptView";

interface PageProps {
  params: Promise<{ txId: string }>;
}

export default async function ReceiptPage({ params }: PageProps) {
  const { txId } = await params;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 flex items-center justify-center min-h-[60vh]">
      <ReceiptView txHash={txId} />
    </div>
  );
}
