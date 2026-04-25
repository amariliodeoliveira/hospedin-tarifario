"use client";

import { useRef, useState } from "react";

import { FieldButton } from "@ui/FieldButton";
import { Counter } from "@ui/Counter";

interface Props {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
  popoverRef?: React.RefObject<HTMLDivElement | null>;
}

export function GuestPicker({
  onMouseEnter,
  onMouseLeave,
  className,
  popoverRef: externalRef,
}: Props) {
  const internalRef = useRef<HTMLDivElement>(null);
  const popoverRef = externalRef ?? internalRef;
  const [adults, setAdults] = useState(0);

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
        {adults === 0
          ? "Hóspedes?"
          : `${adults} hóspede${adults > 1 ? "s" : ""}`}
      </FieldButton>

      <div
        className="dropdown card bg-base-100 mt-2 w-64 shadow-sm"
        ref={popoverRef}
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
