interface Props {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  "aria-labelledby"?: string;
}

export default function Counter({
  value,
  min = 0,
  max = 99,
  onChange,
  "aria-labelledby": ariaLabelledBy,
}: Props) {
  function decrement() {
    onChange(Math.max(min, value - 1));
  }

  function increment() {
    onChange(Math.min(max, value + 1));
  }

  return (
    <div
      role="group"
      aria-labelledby={ariaLabelledBy}
      className="flex items-center gap-2"
    >
      <button
        type="button"
        className="btn btn-circle btn-sm"
        onClick={decrement}
        disabled={value <= min}
        aria-label="Diminuir"
      >
        −
      </button>

      <span className="w-4 text-center text-sm" aria-live="polite">
        {value}
      </span>

      <button
        type="button"
        className="btn btn-circle btn-sm"
        onClick={increment}
        disabled={value >= max}
        aria-label="Aumentar"
      >
        +
      </button>
    </div>
  );
}
