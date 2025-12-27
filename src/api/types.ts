export interface Subscription {
  id: number;
  plan: string;
  price: number;
  currency?: string;
  nextBillingDate?: string; // ISO date string
}
