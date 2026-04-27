import { Accommodation } from "@data/accommodations";

const WEEKEND_SURCHARGE_RATE = 0.2;
const LONG_STAY_DISCOUNT_RATE = 0.1;
const LONG_STAY_MIN_NIGHTS = 7;
const EXTRA_GUEST_RATE_PER_NIGHT = 50;

interface TarifarioInput {
  accommodation: Accommodation;
  range: { from: Date; to: Date };
  adults: number;
}

export interface TarifarioResult {
  accommodationName: string;
  nights: number;
  dailiesBase: number;
  weekendSurcharge: number;
  adults: number;
  extraGuestFee: number;
  extraGuests: number;
  maxGuests: number;
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
  const days = eachDay(from, to);
  const nights = days.length;

  let dailiesBase = 0;
  let weekendSurcharge = 0;

  for (const day of days) {
    const rate = accommodation.dailyRate;
    if (isWeekend(day)) {
      const surcharge = rate * WEEKEND_SURCHARGE_RATE;
      weekendSurcharge += surcharge;
      dailiesBase += rate;
    } else {
      dailiesBase += rate;
    }
  }

  const dailiesTotal = dailiesBase + weekendSurcharge;
  const extraGuests = Math.max(0, adults - accommodation.maxGuests);
  const extraGuestFee = extraGuests * EXTRA_GUEST_RATE_PER_NIGHT * nights;

  const subtotal = dailiesTotal + extraGuestFee;
  const discount =
    nights > LONG_STAY_MIN_NIGHTS ? subtotal * LONG_STAY_DISCOUNT_RATE : 0;
  const total = subtotal - discount + accommodation.cleaningFee;

  return {
    accommodationName: accommodation.name,
    nights,
    dailiesBase,
    weekendSurcharge,
    adults,
    extraGuestFee,
    extraGuests,
    maxGuests: accommodation.maxGuests,
    discount,
    cleaningFee: accommodation.cleaningFee,
    total,
  };
}
