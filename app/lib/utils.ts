import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import ky from 'ky';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const http = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL
});
