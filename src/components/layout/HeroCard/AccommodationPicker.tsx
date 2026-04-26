"use client";

import { HomeIcon } from "@heroicons/react/20/solid";
import { useRef, useState } from "react";

import { PickerProps } from "@/types/picker";
import { Accommodation, accommodations } from "@data/accommodations";
import FieldButton from "@ui/FieldButton";
import { hidePopover } from "@utils/popover";

interface Props extends PickerProps {
  onSelect?: () => void;
}

function AccommodationOption({
  accommodation,
  onSelect,
}: {
  accommodation: Accommodation;
  onSelect: (name: string) => void;
}) {
  return (
    <li>
      <a
        className="flex items-center gap-3 p-3"
        onClick={() => onSelect(accommodation.name)}
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
  onSelect,
}: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const popoverRef = useRef<HTMLUListElement>(null);

  function handleSelect(name: string) {
    setSelected(name);
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
        {selected ?? "Acomodação"}
      </FieldButton>

      <ul
        ref={popoverRef}
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
