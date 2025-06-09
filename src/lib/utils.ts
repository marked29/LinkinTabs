import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenUrl(url: string, maxLength: number = 30): string {
  if (url.length <= maxLength) return url;
  const start = url.slice(0, maxLength / 2);
  const end = url.slice(-maxLength / 2);
  return `${start}...${end}`;
}
