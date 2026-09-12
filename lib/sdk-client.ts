import { WalletSdk } from "@rayos/wallet-sdk";

// Initialize the wallet SDK with testnet configurations
export const walletClient = new WalletSdk({
  networkPassphrase: process.env.NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE || "Test SDF Network ; September 2015",
  rpcUrl: process.env.NEXT_PUBLIC_STELLAR_RPC_URL || "https://soroban-testnet.stellar.org",
  relayUrl: process.env.NEXT_PUBLIC_RELAY_URL || "https://relay.testnet.rayos.org",
});

// For demo purposes, we also need some mock functionality
// to simulate the backend generating the transaction XDR.
export async function generateCheckoutXdr(itemId: string, priceUSD: number): Promise<string> {
  // In a real app, you'd call your backend to build the transaction
  // which transfers the stablecoin from the user to the merchant.
  console.log(`Generating XDR for ${itemId} costing $${priceUSD}`);
  
  // Return a dummy base64 XDR string for the demo
  return "AAAAAgAAAAA...dummy_xdr_for_demo...==";
}
