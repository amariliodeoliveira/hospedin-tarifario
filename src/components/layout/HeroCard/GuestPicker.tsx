"use client";

import { useState } from "react";

import { useIsMobile } from "@/hooks/useIsMobile";
import { PickerProps } from "@/types/picker";
import { pluralize } from "@/utils/string";
import { BottomSheet } from "@ui/BottomSheet";
import Counter from "@ui/Counter";
import FieldButton from "@ui/FieldButton";

interface Props extends PickerProps {
  value: number;
  onChange: (adults: number) => void;
}

function formatGuests(adults: number): string {
  if (adults === 0) return "Hóspedes?";
  return pluralize(adults, "hóspede", "hóspedes");
}

function GuestContent({
  value,
  onChange,
}: {
  value: number;
  onChange: (adults: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-8 p-4">
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
  );
}

export function GuestPicker({
  onMouseEnter,
  onMouseLeave,
  className,
  value,
  onChange,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div
      className={`join-item relative flex items-center ${className ?? ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <FieldButton
        label="Quem"
        popoverTarget={isMobile ? undefined : "popover-guests"}
        anchorName={isMobile ? undefined : "--anchor-guests"}
        className="size-full"
        onClick={isMobile ? () => setIsOpen(true) : undefined}
      >
        {formatGuests(value)}
      </FieldButton>

      {isMobile ? (
        <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <GuestContent value={value} onChange={onChange} />
        </BottomSheet>
      ) : (
        <div
          role="dialog"
          aria-label="Selecione o número de hóspedes"
          className="dropdown card bg-base-100 mt-2 w-64 shadow-sm"
          popover="auto"
          id="popover-guests"
          style={{ positionAnchor: "--anchor-guests" } as React.CSSProperties}
        >
          <div className="card-body p-4">
            <GuestContent value={value} onChange={onChange} />
          </div>
        </div>
      )}
    </div>
  );
}
