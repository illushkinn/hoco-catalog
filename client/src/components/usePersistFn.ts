import { useCallback, useRef } from "react";

type Fn<T extends any[], R> = (...args: T) => R;

export function usePersistFn<T extends any[], R>(fn: Fn<T, R>) {
  const fnRef = useRef<Fn<T, R>>(fn);
  fnRef.current = fn;

  const persistFn = useCallback((...args: T) => {
    return fnRef.current(...args);
  }, []);

  return persistFn;
}
