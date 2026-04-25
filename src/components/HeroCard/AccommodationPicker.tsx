"use client";

import { useState, useRef } from "react";
import { HomeIcon } from "@heroicons/react/20/solid";
import { FieldButton } from "@ui/FieldButton";

const accommodations = [
  { id: "suite", name: "Suíte Jardim", description: "Ambiente mais acolhedor" },
  {
    id: "chale",
    name: "Chalé Família",
    description: "Espaço amplo para toda a família",
  },
];

interface Props {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
  onSelect?: () => void;
}

export function AccommodationPicker({
  onMouseEnter,
  onMouseLeave,
  className,
  onSelect,
}: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const popoverRef = useRef<HTMLUListElement>(null);

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
          <li key={item.id}>
            <a
              className="flex items-center gap-3 p-3"
              onClick={() => {
                setSelected(item.name);
                (
                  popoverRef.current as HTMLElement & {
                    hidePopover: () => void;
                  }
                )?.hidePopover();
                onSelect?.();
              }}
            >
              <div className="bg-base-200 text-primary rounded-lg p-2">
                <HomeIcon className="size-6" />
              </div>
              <div>
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-base-content/60 text-xs">
                  {item.description}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
