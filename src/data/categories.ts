import type { Category } from "../types/book";

export interface CategoryInfo {
  name: Category;
  icon: string; // Font Awesome class
  blurb: string;
}

export const categories: CategoryInfo[] = [
  { name: "Fiction", icon: "fa-feather-alt", blurb: "Stories about people you will miss" },
  { name: "Mystery & Thriller", icon: "fa-search", blurb: "Clues, red herrings, late nights" },
  { name: "Fantasy", icon: "fa-dragon", blurb: "New worlds with their own rules" },
  { name: "Science Fiction", icon: "fa-rocket", blurb: "Near futures and distant stars" },
  { name: "Non-Fiction", icon: "fa-lightbulb", blurb: "Real stories and useful ideas" },
  { name: "Children's", icon: "fa-child", blurb: "Picture books for bedtime" },
];

export const categoryNames: Category[] = categories.map((c) => c.name);
