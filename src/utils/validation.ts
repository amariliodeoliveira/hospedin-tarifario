import { DateRange } from "react-day-picker";

import { Accommodation } from "@data/accommodations";

import { countNights } from "./date";

const ERRORS = {
  noAccommodation: "Selecione uma acomodação para continuar.",
  noRange: "Selecione o período da reserva para continuar.",
  noCheckOut: "Selecione a data de check-out para continuar.",
  minNights: (name: string, min: number) =>
    `A estadia mínima para ${name} é de ${min} noites.`,
  noAdults: "Informe o número de hóspedes para continuar.",
};

export function validateTarifarioForm({
  accommodation,
  range,
  adults,
}: {
  accommodation: Accommodation | null;
  range: DateRange | undefined;
  adults: number;
}): string | null {
  if (!accommodation) return ERRORS.noAccommodation;

  if (!range?.from) return ERRORS.noRange;
  if (!range?.to) return ERRORS.noCheckOut;

  const nights = countNights(range.from, range.to);
  if (nights < accommodation.minNights) {
    return ERRORS.minNights(accommodation.name, accommodation.minNights);
  }

  if (adults === 0) return ERRORS.noAdults;
  return null;
}
