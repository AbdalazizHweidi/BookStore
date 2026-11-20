// The six shelves of the store. Using a fixed list of names prevents typos.
export type Category =
  | "Fiction"
  | "Mystery & Thriller"
  | "Fantasy"
  | "Science Fiction"
  | "Non-Fiction"
  | "Children's";

export interface Book {
  id: string;
  title: string;
  author: string;
  category: Category;
  price: number; // the price the customer pays, in dollars
  originalPrice?: number; // only set when the book is on sale
  cover: string; // path to a portrait cover image in /public/covers
  hook: string; // one-sentence pitch shown on cards and in the hero
  rating: number; // 0 to 5
  reviewCount: number;
}

// One "reason" in the "Why readers love this book" section.
export interface ReaderReason {
  title: string;
  text: string;
}
