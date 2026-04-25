interface Props {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export function Counter({ value, min = 0, max = 99, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <button
        className="btn btn-circle btn-sm"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
      >
        −
      </button>

      <span className="w-4 text-center text-sm">{value}</span>

      <button
        className="btn btn-circle btn-sm"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
      >
        +
      </button>
    </div>
  );
}
