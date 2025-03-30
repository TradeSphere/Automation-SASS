import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getMonth = (month: number) => {
  const months: string[] = [
    'January',
    'Februaru',
    'March',
    'April',
    'May',
    'June',
    'August',
    'September',
    'Octomber',
    'November',
    'Deember'
  ]

  if( month < 1 || month > 12){
    return "Invalid month number. Please enter a number between 1 and 12"
  }

  return months[month - 1]
}
