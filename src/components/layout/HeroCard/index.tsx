"use client";

import { useRef, useState } from "react";
import { DateRange } from "react-day-picker";

import { useError } from "@/hooks/useError";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  calculateTarifario,
  TarifarioResult,
} from "@/utils/calculateTarifario";
import { validateTarifarioForm } from "@/utils/validation";
import { Accommodation } from "@data/accommodations";
import { Alert } from "@ui/Alert";
import FieldButton from "@ui/FieldButton";

import { AccommodationPicker } from "./AccommodationPicker";
import { DateRangePicker } from "./DateRangePicker";
import { GuestPicker } from "./GuestPicker";
import { TarifarioModal } from "./TarifarioModal";

type Section = "dates" | "adults" | "accommodation";

function Divider({ hidden }: { hidden: boolean }) {
  return (
    <div
      className={`divider lg:divider-horizontal m-0 py-2 transition-opacity ${hidden ? "opacity-0" : "opacity-100"}`}
    />
  );
}

export default function HeroCard() {
  const isMobile = useIsMobile();
  const [hoveredSection, setHoveredSection] = useState<Section | null>(null);
  const [accommodation, setAccommodation] = useState<Accommodation | null>(
    null,
  );
  const [range, setRange] = useState<DateRange | undefined>();
  const [adults, setAdults] = useState(0);
  const [result, setResult] = useState<TarifarioResult | null>(null);
  const { error, showError } = useError();

  const datePopoverRef = useRef<HTMLDivElement>(null);

  const isDividerHidden = !isMobile && !!hoveredSection;

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const validationError = validateTarifarioForm({
      accommodation,
      range,
      adults,
    });
    if (validationError) {
      showError(validationError);
      return;
    }

    const tarifario = calculateTarifario({
      accommodation: accommodation!,
      range: range as { from: Date; to: Date },
      adults,
    });
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

        <Divider hidden={isDividerHidden} />

        <DateRangePicker
          className="flex-1"
          value={range}
          onChange={setRange}
          minNights={accommodation?.minNights}
          popoverRef={datePopoverRef}
          onClose={() => setHoveredSection(null)}
          onMouseEnter={() => setHoveredSection("dates")}
          onMouseLeave={() => setHoveredSection(null)}
        />

        <Divider hidden={isDividerHidden} />

        <GuestPicker
          className="join-item flex-1"
          value={adults}
          onChange={setAdults}
          onMouseEnter={() => setHoveredSection("adults")}
          onMouseLeave={() => setHoveredSection(null)}
        />

        <div className="join-item self-stretch">
          <FieldButton
            type="submit"
            className="lg:rounded-tr-(--radius-field) h-full w-full rounded-tl-none rounded-tr-none lg:rounded-l-none lg:rounded-tl-none"
            variant="primary"
          >
            <span className="font-medium">Calcular</span>
          </FieldButton>
        </div>
      </form>

      <TarifarioModal id="tarifario-modal" result={result} />

      {error && (
        <div className="toast toast-bottom toast-center">
          <Alert type="warning" message={error} />
        </div>
      )}
    </>
  );
}
