"use client";

import { useState, useRef } from "react";

import { AccommodationPicker } from "./AccommodationPicker";
import { DateRangePicker } from "./DateRangePicker";
import { GuestPicker } from "./GuestPicker";
import { FieldButton } from "../ui/FieldButton";

export default function HeroCard() {
  const [hoveredSection, setHoveredSection] = useState<
    "dates" | "adults" | "accommodation" | null
  >(null);

  const datePopoverRef = useRef<HTMLDivElement>(null);
  const guestPopoverRef = useRef<HTMLDivElement>(null);

  return (
    <div className="card join join-vertical lg:join-horizontal bg-base-100 relative w-full shadow-sm">
      <AccommodationPicker
        className="flex-1"
        onMouseEnter={() => setHoveredSection("accommodation")}
        onMouseLeave={() => setHoveredSection(null)}
        onSelect={() => datePopoverRef.current?.showPopover()}
      />

      <div
        className={`divider lg:divider-horizontal m-0 w-0 py-2 transition-opacity ${hoveredSection ? "opacity-0" : "opacity-100"}`}
      />

      <DateRangePicker
        className="flex-1"
        popoverRef={datePopoverRef}
        onClose={() => guestPopoverRef.current?.showPopover()}
        onMouseEnter={() => setHoveredSection("dates")}
        onMouseLeave={() => setHoveredSection(null)}
      />

      <div
        className={`divider lg:divider-horizontal m-0 w-0 py-2 transition-opacity ${hoveredSection ? "opacity-0" : "opacity-100"}`}
      />

      <GuestPicker
        className="join-item flex-1"
        popoverRef={guestPopoverRef}
        onMouseEnter={() => setHoveredSection("adults")}
        onMouseLeave={() => setHoveredSection(null)}
      />

      <div className="join-item">
        <FieldButton className="h-full rounded-l-none" variant="primary">
          Calcular
        </FieldButton>
      </div>
    </div>
  );
}
