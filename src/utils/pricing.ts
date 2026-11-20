import { getBookById } from "../data/books";
import type { CartLine, OrderTotals } from "../types/order";

// What the cart store saves: only the book id and how many copies.
export interface CartItem {
  bookId: string;
  quantity: number;
}

export const FLAT_SHIPPING_FEE = 4.99;
export const FREE_SHIPPING_THRESHOLD = 35;

// Avoids results like 33.9700000001 when adding prices.
function roundToCents(amount: number): number {
  return Math.round(amount * 100) / 100;
}

// Joins saved cart items with the book data. Unknown ids are skipped.
export function buildCartLines(items: CartItem[]): CartLine[] {
  const lines: CartLine[] = [];
  for (const item of items) {
    const book = getBookById(item.bookId);
    if (book) {
      lines.push({ book, quantity: item.quantity, lineTotal: roundToCents(book.price * item.quantity) });
    }
  }
  return lines;
}

// total = subtotal + shipping. Shipping is free for orders of $35 or more (and for an empty cart).
export function calculateTotals(lines: CartLine[]): OrderTotals {
  const subtotal = roundToCents(lines.reduce((sum, line) => sum + line.lineTotal, 0));
  const shipping = lines.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_FEE;
  return { subtotal, shipping, total: roundToCents(subtotal + shipping) };
}
