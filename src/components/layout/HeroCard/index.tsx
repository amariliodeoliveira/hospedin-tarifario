"use client";

import { useRef, useState } from "react";
import { DateRange } from "react-day-picker";

import {
  calculateTarifario,
  TarifarioResult,
} from "@/utils/calculateTarifario";
import { Accommodation } from "@data/accommodations";
import FieldButton from "@ui/FieldButton";

import { AccommodationPicker } from "./AccommodationPicker";
import { DateRangePicker } from "./DateRangePicker";
import { GuestPicker } from "./GuestPicker";
import { TarifarioModal } from "./TarifarioModal";

type Section = "dates" | "adults" | "accommodation";

function Divider({ hidden }: { hidden: boolean }) {
  return (
    <div
      className={`divider lg:divider-horizontal m-0 w-0 py-2 transition-opacity ${hidden ? "opacity-0" : "opacity-100"}`}
    />
  );
}

export default function HeroCard() {
  const [hoveredSection, setHoveredSection] = useState<Section | null>(null);
  const [accommodation, setAccommodation] = useState<Accommodation | null>(
    null,
  );
  const [range, setRange] = useState<DateRange | undefined>();
  const [adults, setAdults] = useState(0);

  const datePopoverRef = useRef<HTMLDivElement>(null);
  const guestPopoverRef = useRef<HTMLDivElement>(null);

  const [result, setResult] = useState<TarifarioResult | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!accommodation || !range?.from || !range?.to || adults === 0) return;

    const tarifario = calculateTarifario({ accommodation, range, adults });
    setResult(tarifario);
    (
      document.getElementById("tarifario-modal") as HTMLDialogElement
    )?.showModal();
  }

  return (
    <>
      <form
        className="card join join-vertical lg:join-horizontal bg-base-100 relative w-full shadow-sm"
        onSubmit={handleSubmit}
      >
        <AccommodationPicker
          className="flex-1"
          value={accommodation}
          onChange={setAccommodation}
          onMouseEnter={() => setHoveredSection("accommodation")}
          onMouseLeave={() => setHoveredSection(null)}
          onSelect={() => datePopoverRef.current?.showPopover()}
        />

        <Divider hidden={!!hoveredSection} />

        <DateRangePicker
          className="flex-1"
          value={range}
          onChange={setRange}
          popoverRef={datePopoverRef}
          onClose={() => guestPopoverRef.current?.showPopover()}
          onMouseEnter={() => setHoveredSection("dates")}
          onMouseLeave={() => setHoveredSection(null)}
        />

        <Divider hidden={!!hoveredSection} />

        <GuestPicker
          className="join-item flex-1"
          value={adults}
          onChange={setAdults}
          popoverRef={guestPopoverRef}
          onMouseEnter={() => setHoveredSection("adults")}
          onMouseLeave={() => setHoveredSection(null)}
        />

        <div className="join-item self-stretch">
          <FieldButton
            type="submit"
            className="h-full rounded-l-none"
            variant="primary"
          >
            <span className="font-medium">Calcular</span>
          </FieldButton>
        </div>
      </form>

      <TarifarioModal id="tarifario-modal" result={result} />
    </>
  );
}
