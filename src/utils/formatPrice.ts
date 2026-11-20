const dollars = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

// formatPrice(16.99) -> "$16.99"
export function formatPrice(amount: number): string {
  return dollars.format(amount);
}
