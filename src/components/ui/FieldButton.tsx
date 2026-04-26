import { type ButtonHTMLAttributes } from "react";

type Variant = "ghost" | "primary" | "secondary" | "accent";

const variantClass = {
  ghost: "btn-ghost",
  primary: "btn-primary",
  secondary: "btn-secondary",
  accent: "btn-accent",
} satisfies Record<Variant, string>;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?: Variant;
  popoverTarget?: string;
  anchorName?: string;
}

export default function FieldButton({
  label,
  variant = "ghost",
  popoverTarget,
  anchorName,
  className,
  children,
  type = "button",
  ...props
}: Props) {
  return (
    <button
      type={type}
      popoverTarget={popoverTarget}
      className={`btn ${variantClass[variant]} btn-xl h-auto flex-col items-start gap-1 px-6 py-4 ${className ?? ""}`.trim()}
      style={anchorName ? ({ anchorName } as React.CSSProperties) : undefined}
      {...props}
    >
      {label && (
        <span className="text-xs font-semibold" aria-hidden="true">
          {label}
        </span>
      )}
      <span
        className={`text-sm font-normal ${variant === "ghost" ? "text-base-content/60" : ""}`}
      >
        {children}
      </span>
    </button>
  );
}
