import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "../utils/pricing";

export const MAX_QUANTITY_PER_BOOK = 10;

interface CartState {
  items: CartItem[];
  addToCart: (bookId: string) => void;
  increaseQuantity: (bookId: string) => void;
  decreaseQuantity: (bookId: string) => void;
  removeFromCart: (bookId: string) => void;
  clearCart: () => void;
}

// Adds one copy: creates the row if the book is new, otherwise raises its quantity.
function addOneCopy(items: CartItem[], bookId: string): CartItem[] {
  const existing = items.find((item) => item.bookId === bookId);
  if (!existing) return [...items, { bookId, quantity: 1 }];
  return items.map((item) =>
    item.bookId === bookId
      ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY_PER_BOOK) }
      : item,
  );
}

// `persist` saves the cart in localStorage under the key "leaflet-cart",
// so it is still there after the page is refreshed.
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (bookId) => set((state) => ({ items: addOneCopy(state.items, bookId) })),
      increaseQuantity: (bookId) => set((state) => ({ items: addOneCopy(state.items, bookId) })),
      decreaseQuantity: (bookId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.bookId === bookId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item,
          ),
        })),
      removeFromCart: (bookId) =>
        set((state) => ({ items: state.items.filter((item) => item.bookId !== bookId) })),
      clearCart: () => set({ items: [] }),
    }),
    { name: "leaflet-cart" },
  ),
);
