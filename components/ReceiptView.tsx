import Link from "next/link";

interface ReceiptViewProps {
  txHash: string;
}

export function ReceiptView({ txHash }: ReceiptViewProps) {
  // Use Stellar Expert testnet explorer
  const explorerUrl = `https://stellar.expert/explorer/testnet/tx/${txHash}`;
  
  // Create a shortened version for display
  const shortHash = txHash.length > 20 
    ? `${txHash.substring(0, 10)}...${txHash.substring(txHash.length - 10)}`
    : txHash;

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm max-w-lg w-full mx-auto text-center">
      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
        <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Payment Successful!</h2>
      <p className="text-gray-500 mb-8">
        Your gasless passkey payment was executed successfully on the testnet.
      </p>
      
      <div className="bg-gray-50 rounded-lg p-5 text-left border border-gray-100 mb-8">
        <p className="text-sm font-medium text-gray-500 mb-1">Transaction Hash</p>
        <p className="font-mono text-gray-900 break-all bg-white p-3 rounded border border-gray-200">
          {shortHash}
        </p>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-2">On-Chain Verification</p>
          <a 
            href={explorerUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800 hover:underline font-medium group"
          >
            View on Stellar Expert (Testnet)
            <svg className="ml-1 w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <p className="text-xs text-gray-400 mt-2">
            This is your visible proof of non-custodial ownership and settlement.
          </p>
        </div>
      </div>
      
      <Link 
        href="/shop"
        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-black hover:bg-gray-800 transition-colors w-full"
      >
        Return to Shop
      </Link>
    </div>
  );
}
