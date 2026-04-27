"use client";

import { HomeIcon } from "@heroicons/react/20/solid";
import { useRef, useState } from "react";

import { useIsMobile } from "@/hooks/useIsMobile";
import { PickerProps } from "@/types/picker";
import { Accommodation, accommodations } from "@data/accommodations";
import { BottomSheet } from "@ui/BottomSheet";
import FieldButton from "@ui/FieldButton";
import { hidePopover } from "@utils/popover";

interface Props extends PickerProps {
  value: Accommodation | null;
  onChange: (accommodation: Accommodation) => void;
  onSelect?: () => void;
}

function AccommodationOption({
  accommodation,
  onSelect,
}: {
  accommodation: Accommodation;
  onSelect: (accommodation: Accommodation) => void;
}) {
  return (
    <li role="option" aria-selected={false}>
      <a
        className="flex items-center gap-3 p-3"
        onClick={() => onSelect(accommodation)}
      >
        <div className="bg-base-200 text-primary rounded-lg p-2">
          <HomeIcon className="size-6" />
        </div>
        <div>
          <p className="text-sm font-semibold">{accommodation.name}</p>
          <p className="text-base-content/60 text-xs">
            {accommodation.description}
          </p>
        </div>
      </a>
    </li>
  );
}

function AccommodationList({
  onSelect,
}: {
  onSelect: (accommodation: Accommodation) => void;
}) {
  return (
    <ul role="listbox" aria-label="Selecione uma acomodação">
      {accommodations.map((item) => (
        <AccommodationOption
          key={item.id}
          accommodation={item}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}

export function AccommodationPicker({
  onMouseEnter,
  onMouseLeave,
  className,
  value,
  onChange,
  onSelect,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const popoverRef = useRef<HTMLDivElement>(null);

  function handleSelect(accommodation: Accommodation) {
    onChange(accommodation);
    if (isMobile) {
      setIsOpen(false);
    } else {
      hidePopover(popoverRef.current);
    }
    onSelect?.();
  }

  return (
    <div
      className={`join-item relative flex items-center ${className ?? ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <FieldButton
        label="Onde"
        popoverTarget={isMobile ? undefined : "popover-accommodation"}
        anchorName={isMobile ? undefined : "--anchor-accommodation"}
        className="size-full"
        onClick={isMobile ? () => setIsOpen(true) : undefined}
      >
        {value?.name ?? "Acomodação"}
      </FieldButton>

      {isMobile ? (
        <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <AccommodationList onSelect={handleSelect} />
        </BottomSheet>
      ) : (
        <div
          ref={popoverRef}
          role="listbox"
          aria-label="Selecione uma acomodação"
          className="dropdown menu rounded-box bg-base-100 mt-2 shadow-sm"
          popover="auto"
          id="popover-accommodation"
          style={
            { positionAnchor: "--anchor-accommodation" } as React.CSSProperties
          }
        >
          <AccommodationList onSelect={handleSelect} />
        </div>
      )}
    </div>
  );
}
