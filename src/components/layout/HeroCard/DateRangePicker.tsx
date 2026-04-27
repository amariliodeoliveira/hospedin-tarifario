"use client";

import { useRef, useMemo, useState, useCallback } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { ptBR } from "react-day-picker/locale";

import { useIsMobile } from "@/hooks/useIsMobile";
import { PickerProps } from "@/types/picker";
import { BottomSheet } from "@ui/BottomSheet";
import FieldButton from "@ui/FieldButton";
import { addDays, formatDateRange } from "@utils/date";
import { hidePopover } from "@utils/popover";

interface Props extends PickerProps {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  minNights?: number;
  popoverRef?: React.RefObject<HTMLDivElement | null>;
  onClose?: () => void;
}

const TODAY = new Date();

export function DateRangePicker({
  onMouseEnter,
  onMouseLeave,
  className,
  value,
  onChange,
  minNights,
  popoverRef: externalRef,
  onClose,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const tomorrow = useMemo(() => addDays(TODAY, 1), []);
  const internalRef = useRef<HTMLDivElement>(null);
  const popoverRef = externalRef ?? internalRef;

  const handleSelect = useCallback(
    (range: DateRange | undefined) => {
      onChange(range);
      if (range?.to) {
        if (isMobile) {
          setIsOpen(false);
        } else {
          hidePopover(popoverRef.current);
        }
        onClose?.();
      }
    },
    [isMobile, onChange, onClose, popoverRef],
  );

  const dayPicker = useMemo(
    () => (
      <DayPicker
        className="react-day-picker"
        classNames={
          isMobile
            ? {
                root: "w-full border-none",
                months: "w-full",
                month: "w-full",
              }
            : undefined
        }
        startMonth={TODAY}
        numberOfMonths={isMobile ? 1 : 2}
        locale={ptBR}
        timeZone="Brazil/East"
        mode="range"
        selected={value}
        onSelect={handleSelect}
        resetOnSelect
        required
        min={minNights}
        disabled={{ before: tomorrow }}
        excludeDisabled
        autoFocus
      />
    ),
    [isMobile, value, minNights, tomorrow, handleSelect],
  );

  return (
    <div
      className={`join-item relative flex items-center ${className ?? ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <FieldButton
        className="w-full"
        label="Quando"
        popoverTarget={isMobile ? undefined : "rdp-popover"}
        anchorName={isMobile ? undefined : "--rdp"}
        onClick={isMobile ? () => setIsOpen(true) : undefined}
      >
        {formatDateRange(value)}
      </FieldButton>

      {isMobile ? (
        <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {dayPicker}
        </BottomSheet>
      ) : (
        <div
          ref={popoverRef}
          popover="auto"
          id="rdp-popover"
          role="dialog"
          aria-label="Selecione o período de estadia"
          className="dropdown mt-2"
          style={{ positionAnchor: "--rdp" } as React.CSSProperties}
        >
          {dayPicker}
        </div>
      )}
    </div>
  );
}
