import { DateRange } from "react-day-picker";

import { Accommodation } from "@data/accommodations";

interface TarifarioInput {
  accommodation: Accommodation;
  range: DateRange;
  adults: number;
}

export interface TarifarioResult {
  accommodationName: string;
  nights: number;
  dailiesTotal: number;
  weekendSurcharge: number;
  extraGuestFee: number;
  discount: number;
  cleaningFee: number;
  total: number;
}

function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

function eachDay(from: Date, to: Date): Date[] {
  const days: Date[] = [];
  const current = new Date(from);
  while (current < to) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return days;
}

export function calculateTarifario({
  accommodation,
  range,
  adults,
}: TarifarioInput): TarifarioResult {
  const { from, to } = range;
  const days = eachDay(from!, to!);
  const nights = days.length;

  // Diárias com acréscimo de fim de semana
  let dailiesTotal = 0;
  let weekendSurcharge = 0;

  for (const day of days) {
    const rate = accommodation.dailyRate;
    if (isWeekend(day)) {
      const surcharge = rate * 0.2;
      weekendSurcharge += surcharge;
      dailiesTotal += rate + surcharge;
    } else {
      dailiesTotal += rate;
    }
  }

  // Hóspedes extras
  const extraGuests = Math.max(0, adults - accommodation.maxGuests);
  const extraGuestFee = extraGuests * 50 * nights;

  // Subtotal antes do desconto
  const subtotal = dailiesTotal + extraGuestFee;

  // Desconto de 10% para mais de 7 noites
  const discount = nights > 7 ? subtotal * 0.1 : 0;

  const total = subtotal - discount + accommodation.cleaningFee;

  return {
    accommodationName: accommodation.name,
    nights,
    dailiesTotal,
    weekendSurcharge,
    extraGuestFee,
    discount,
    cleaningFee: accommodation.cleaningFee,
    total,
  };
}
