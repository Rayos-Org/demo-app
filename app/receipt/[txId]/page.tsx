import { ReceiptView } from "@/components/ReceiptView";

interface PageProps {
  params: Promise<{ txId: string }>;
}

export default async function ReceiptPage({ params }: PageProps) {
  const { txId } = await params;
  
  return (
    <div className="py-12 flex items-center justify-center">
      <ReceiptView txHash={txId} />
    </div>
  );
}
