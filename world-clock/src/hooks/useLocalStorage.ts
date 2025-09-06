import { useEffect, useState } from 'react';

// Enkel, typad localStorage-hook
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const json = localStorage.getItem(key);
      return json ? (JSON.parse(json) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignorera lagringsfel (t.ex. privat läge)
    }
  }, [key, value]);

  return [value, setValue] as const;
}