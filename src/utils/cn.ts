import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitial(str: string): string {
  if (!str) return "";

  const strArr = str?.split(" ").map((each) => each.charAt(0).toUpperCase());

  if (strArr.length > 2) return [strArr[0], strArr[strArr.length - 1]].join("");
  else return strArr.join("");
}
