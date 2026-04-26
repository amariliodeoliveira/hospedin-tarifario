"use client";

import { useRef, useState } from "react";

import { PickerProps } from "@/types/picker";
import Counter from "@ui/Counter";
import FieldButton from "@ui/FieldButton";

interface Props extends PickerProps {
  popoverRef?: React.RefObject<HTMLDivElement | null>;
}

function formatGuests(adults: number): string {
  if (adults === 0) return "Hóspedes?";
  return `${adults} hóspede${adults > 1 ? "s" : ""}`;
}

export function GuestPicker({
  onMouseEnter,
  onMouseLeave,
  className,
  popoverRef: externalRef,
}: Props) {
  const [adults, setAdults] = useState(0);
  const internalRef = useRef<HTMLDivElement>(null);
  const popoverRef = externalRef ?? internalRef;

  return (
    <div
      className={`join-item relative flex items-center ${className ?? ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <FieldButton
        label="Quem"
        popoverTarget="popover-guests"
        anchorName="--anchor-guests"
        className="size-full"
      >
        {formatGuests(adults)}
      </FieldButton>

      <div
        ref={popoverRef}
        className="dropdown card bg-base-100 mt-2 w-64 shadow-sm"
        popover="auto"
        id="popover-guests"
        style={{ positionAnchor: "--anchor-guests" } as React.CSSProperties}
      >
        <div className="card-body p-4">
          <div className="flex items-center justify-between">
            <p className="text-base">Adultos</p>
            <Counter value={adults} min={0} onChange={setAdults} />
          </div>
        </div>
      </div>
    </div>
  );
}
