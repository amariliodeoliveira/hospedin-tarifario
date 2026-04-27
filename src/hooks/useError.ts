import { useRef, useState } from "react";

export function useError(duration = 3000) {
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showError(message: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setError(message);
    timeoutRef.current = setTimeout(() => setError(null), duration);
  }

  return { error, showError };
}
