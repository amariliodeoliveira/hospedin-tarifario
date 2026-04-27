export interface Accommodation {
  id: string;
  name: string;
  description: string;
  dailyRate: number;
  cleaningFee: number;
  minNights: number;
  maxGuests: number;
}

export const accommodations: readonly Accommodation[] = [
  {
    id: "suite",
    name: "Suíte Jardim",
    description: "Ambiente mais acolhedor",
    dailyRate: 300,
    cleaningFee: 80,
    minNights: 2,
    maxGuests: 2,
  },
  {
    id: "chale",
    name: "Chalé Família",
    description: "Espaço amplo para toda a família",
    dailyRate: 450,
    cleaningFee: 100,
    minNights: 2,
    maxGuests: 4,
  },
] as const;
