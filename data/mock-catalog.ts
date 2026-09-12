export interface Product {
  id: string;
  name: string;
  description: string;
  priceUSD: number;
  image: string;
}

export const mockCatalog: Product[] = [
  {
    id: "prod_1",
    name: "Limited Edition Hacker Hoodie",
    description: "Premium heavy-weight cotton hoodie for late night coding sessions.",
    priceUSD: 65.00,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "prod_2",
    name: "Mechanical Keyboard (Blue Switches)",
    description: "Tactile and clicky mechanical keyboard. Annoy your coworkers in style.",
    priceUSD: 120.00,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "prod_3",
    name: "Noise-Cancelling Headphones",
    description: "Focus on your code with industry-leading noise cancellation.",
    priceUSD: 250.00,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "prod_4",
    name: "Developer Coffee Mug",
    description: "Fuel your day with this extra-large ceramic mug.",
    priceUSD: 18.50,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400"
  }
];

export function getProduct(id: string): Product | undefined {
  return mockCatalog.find((p) => p.id === id);
}
