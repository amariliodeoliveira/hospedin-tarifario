import { type ButtonHTMLAttributes } from "react";

type Variant = "ghost" | "primary" | "secondary" | "accent";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?: Variant;
  popoverTarget?: string;
  anchorName?: string;
}

export function FieldButton({
  label,
  variant = "ghost",
  popoverTarget,
  anchorName,
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      popoverTarget={popoverTarget}
      className={`btn btn-${variant} btn-xl h-auto flex-col items-start gap-1 px-6 py-4 ${className ?? ""}`}
      style={anchorName ? ({ anchorName } as React.CSSProperties) : undefined}
      {...props}
    >
      {label && <span className="text-xs font-semibold">{label}</span>}
      <span className="text-base-content/60 text-sm font-normal">
        {children}
      </span>
    </button>
  );
}
