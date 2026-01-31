// types/stock.ts または src/types/stock.ts
export interface StockItem {
  id: string;
  name: string;
  category: "food" | "water" | "medicine" | "tool" | "other";
  quantity: number;
  unit: string;
  expiryDate?: string;
  lastChecked?: string;
}
