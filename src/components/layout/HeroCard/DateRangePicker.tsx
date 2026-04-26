"use client";

import { useRef, useMemo, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { ptBR } from "react-day-picker/locale";

import { PickerProps } from "@/types/picker";
import FieldButton from "@ui/FieldButton";
import { addDays, formatDateRange } from "@utils/date";
import { hidePopover } from "@utils/popover";

interface Props extends PickerProps {
  popoverRef?: React.RefObject<HTMLDivElement | null>;
  onClose?: () => void;
}

const TODAY = new Date();

export function DateRangePicker({
  onMouseEnter,
  onMouseLeave,
  className,
  popoverRef: externalRef,
  onClose,
}: Props) {
  const [range, setRange] = useState<DateRange | undefined>();
  const tomorrow = useMemo(() => addDays(TODAY, 1), []);

  const internalRef = useRef<HTMLDivElement>(null);
  const popoverRef = externalRef ?? internalRef;

  function handleSelect(range: DateRange | undefined) {
    setRange(range);
    if (range?.to) {
      hidePopover(popoverRef.current);
      onClose?.();
    }
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
        {formatDateRange(range)}
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
          startMonth={TODAY}
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
