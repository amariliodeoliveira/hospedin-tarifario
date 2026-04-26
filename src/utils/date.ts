import { DateRange } from "react-day-picker";

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function formatDateRange(range: DateRange | undefined): string {
  if (range?.from && range?.to)
    return `${range.from.toLocaleDateString()} — ${range.to.toLocaleDateString()}`;
  if (range?.from) return range.from.toLocaleDateString();
  return "Insira as datas";
}
