import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import * as Yup from "yup";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default Yup
