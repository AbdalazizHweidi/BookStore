import { useMemo, useState } from "react";
import { books } from "../data/books";
import type { Category } from "../types/book";
import {
  defaultFilters,
  filterBooks,
  type BookFilters,
  type PriceRange,
  type SortOption,
} from "../utils/filterBooks";

// Holds the filter choices for the Books page and returns the matching books.
export function useBookFilters(initialCategory: Category | "All" = "All") {
  const [filters, setFilters] = useState<BookFilters>({ ...defaultFilters, category: initialCategory });

  const visibleBooks = useMemo(() => filterBooks(books, filters), [filters]);

  const hasActiveFilters =
    filters.searchText !== "" ||
    filters.category !== "All" ||
    filters.priceRange !== "all" ||
    filters.sortBy !== "default";

  return {
    filters,
    visibleBooks,
    hasActiveFilters,
    setSearchText: (searchText: string) => setFilters((f) => ({ ...f, searchText })),
    setCategory: (category: Category | "All") => setFilters((f) => ({ ...f, category })),
    setPriceRange: (priceRange: PriceRange) => setFilters((f) => ({ ...f, priceRange })),
    setSortBy: (sortBy: SortOption) => setFilters((f) => ({ ...f, sortBy })),
    resetFilters: () => setFilters(defaultFilters),
  };
}
