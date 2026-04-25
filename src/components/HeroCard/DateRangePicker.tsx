"use client";

import { useState, useRef } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { ptBR } from "react-day-picker/locale";
import { addDays } from "@/utils/date";
import { FieldButton } from "@ui/FieldButton";

interface Props {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
  popoverRef?: React.RefObject<HTMLDivElement | null>;
  onClose?: () => void;
}

export function DateRangePicker({
  onMouseEnter,
  onMouseLeave,
  className,
  popoverRef: externalRef,
  onClose,
}: Props) {
  const [range, setRange] = useState<DateRange | undefined>();
  const tomorrow = addDays(new Date(), 1);

  const internalRef = useRef<HTMLDivElement>(null);
  const popoverRef = externalRef ?? internalRef;

  function handleSelect(range: DateRange | undefined) {
    setRange(range);
    if (range?.to) {
      (
        popoverRef.current as HTMLElement & { hidePopover: () => void }
      )?.hidePopover();
      onClose?.();
    }
  }

  function formatRange(): React.ReactNode {
    if (range?.from && range?.to)
      return `${range.from.toLocaleDateString()} — ${range.to.toLocaleDateString()}`;
    if (range?.from) return `${range.from.toLocaleDateString()}`;
    return <span className="flex items-center gap-4">Insira as datas</span>;
  }

  return (
    <div
      className={`join-item relative flex items-center ${className ?? ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <FieldButton
        className="w-full"
        label="Quando"
        popoverTarget="rdp-popover"
        anchorName="--rdp"
      >
        {formatRange()}
      </FieldButton>

      <div
        ref={popoverRef}
        popover="auto"
        id="rdp-popover"
        className="dropdown mt-2"
        style={{ positionAnchor: "--rdp" } as React.CSSProperties}
      >
        <DayPicker
          className="react-day-picker"
          startMonth={new Date()}
          numberOfMonths={2}
          locale={ptBR}
          timeZone="Brazil/East"
          mode="range"
          selected={range}
          onSelect={handleSelect}
          resetOnSelect
          required
          min={2}
          disabled={{ before: tomorrow }}
          excludeDisabled
          autoFocus
        />
      </div>
    </div>
  );
}
