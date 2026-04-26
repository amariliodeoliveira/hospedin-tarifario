"use client";

import { useRef } from "react";

import { PickerProps } from "@/types/picker";
import Counter from "@ui/Counter";
import FieldButton from "@ui/FieldButton";

interface Props extends PickerProps {
  value: number;
  onChange: (adults: number) => void;
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
  value,
  onChange,
  popoverRef: externalRef,
}: Props) {
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
        {formatGuests(value)}
      </FieldButton>

      <div
        ref={popoverRef}
        role="dialog"
        aria-label="Selecione o número de hóspedes"
        className="dropdown card bg-base-100 mt-2 w-64 shadow-sm"
        popover="auto"
        id="popover-guests"
        style={{ positionAnchor: "--anchor-guests" } as React.CSSProperties}
      >
        <div className="card-body p-4">
          <div className="flex items-center justify-between">
            <p className="text-base" id="adults-label">
              Adultos
            </p>
            <Counter
              value={value}
              min={0}
              onChange={onChange}
              aria-labelledby="adults-label"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
