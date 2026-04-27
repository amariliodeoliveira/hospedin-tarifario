import { DateRange } from "react-day-picker";

const MS_PER_DAY = 86_400_000;

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function countNights(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / MS_PER_DAY);
}

export function formatDateRange(range: DateRange | undefined): string {
  if (range?.from && range?.to)
    return `${range.from.toLocaleDateString()} — ${range.to.toLocaleDateString()}`;
  if (range?.from) return range.from.toLocaleDateString();
  return "Insira as datas";
}
