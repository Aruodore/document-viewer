import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes conditionally.
 * @param args - Class names or objects
 * @returns A merged class string
 */
export function cn(...args: any[]) {
  return twMerge(clsx(args));
}
