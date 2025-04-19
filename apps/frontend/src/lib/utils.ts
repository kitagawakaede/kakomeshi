import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwindのクラス名をいい感じにマージしてくれる関数
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
