import type { Book, Category } from "../types/book";

export type PriceRange = "all" | "under-15" | "15-20" | "over-20";
export type SortOption = "default" | "price-low-high" | "price-high-low";

export interface BookFilters {
  searchText: string;
  category: Category | "All";
  priceRange: PriceRange;
  sortBy: SortOption;
}

export const defaultFilters: BookFilters = {
  searchText: "",
  category: "All",
  priceRange: "all",
  sortBy: "default",
};

export const priceRangeLabels: Record<PriceRange, string> = {
  all: "Any price",
  "under-15": "Under $15",
  "15-20": "$15 to $20",
  "over-20": "Over $20",
};

function isInPriceRange(price: number, range: PriceRange): boolean {
  if (range === "under-15") return price < 15;
  if (range === "15-20") return price >= 15 && price <= 20;
  if (range === "over-20") return price > 20;
  return true; // "all"
}

// Returns the books that match every filter, then sorts them.
// Search looks at the title and the author, because readers often search by either.
export function filterBooks(allBooks: Book[], filters: BookFilters): Book[] {
  const search = filters.searchText.trim().toLowerCase();

  const matches = allBooks.filter((book) => {
    const matchesSearch =
      search === "" ||
      book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search);
    const matchesCategory = filters.category === "All" || book.category === filters.category;
    const matchesPrice = isInPriceRange(book.price, filters.priceRange);
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Copy first: .sort() changes the array it is called on.
  const sorted = [...matches];
  if (filters.sortBy === "price-low-high") sorted.sort((a, b) => a.price - b.price);
  if (filters.sortBy === "price-high-low") sorted.sort((a, b) => b.price - a.price);
  return sorted;
}
