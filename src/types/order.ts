import type { Book } from "./book";
import type { CheckoutFormValues } from "../schemas/checkoutSchema";

// A cart row joined with its book data, ready to display.
export interface CartLine {
  book: Book;
  quantity: number;
  lineTotal: number;
}

export interface OrderTotals {
  subtotal: number;
  shipping: number;
  total: number;
}

// A copy of everything the confirmation screen needs, saved before the cart is cleared.
export interface CompletedOrder extends OrderTotals {
  reference: string;
  placedAt: string; // ISO date string
  customer: CheckoutFormValues;
  lines: CartLine[];
}
