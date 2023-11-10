import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { PartialUserWithIdType } from "@models/User";

 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatEmailString(
  userEmail: PartialUserWithIdType,
  opts: { includeFullEmail: boolean } = { includeFullEmail: false }
) {
  if (userEmail?.name) {
    return `${userEmail.name} ${
      opts.includeFullEmail ? `<${userEmail.email}>` : ""
    }`;
  }
  return userEmail?.email as string;
}

export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt: string) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
}
