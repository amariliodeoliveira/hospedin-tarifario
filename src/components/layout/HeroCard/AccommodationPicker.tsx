"use client";

import { HomeIcon } from "@heroicons/react/20/solid";
import { useRef } from "react";

import { PickerProps } from "@/types/picker";
import { Accommodation, accommodations } from "@data/accommodations";
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

export function AccommodationPicker({
  onMouseEnter,
  onMouseLeave,
  className,
  value,
  onChange,
  onSelect,
}: Props) {
  const popoverRef = useRef<HTMLUListElement>(null);

  function handleSelect(accommodation: Accommodation) {
    onChange(accommodation);
    hidePopover(popoverRef.current);
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
        popoverTarget="popover-accommodation"
        anchorName="--anchor-accommodation"
        className="size-full"
      >
        {value?.name ?? "Acomodação"}
      </FieldButton>

      <ul
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
        {accommodations.map((item) => (
          <AccommodationOption
            key={item.id}
            accommodation={item}
            onSelect={handleSelect}
          />
        ))}
      </ul>
    </div>
  );
}
