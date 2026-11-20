import { useCartStore } from "../store/cartStore";
import { buildCartLines, calculateTotals } from "../utils/pricing";

// Everything a page needs to show the cart: the lines, the item count and the money totals.
export function useCartSummary() {
  const items = useCartStore((state) => state.items);
  const lines = buildCartLines(items);
  const itemCount = lines.reduce((count, line) => count + line.quantity, 0);
  const { subtotal, shipping, total } = calculateTotals(lines);
  return { lines, itemCount, subtotal, shipping, total };
}
