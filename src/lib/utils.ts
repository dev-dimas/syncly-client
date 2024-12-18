import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(input: string) {
  const words = input.split(" ").filter((word) => word.length > 0);

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function getRelativeTime(date: string | Date) {
  return dayjs().to(dayjs(date));
}
