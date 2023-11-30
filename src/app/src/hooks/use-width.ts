import React, { useEffect, useMemo, useRef, useState } from "react";
import { RefObject } from "types/react";

export function useWidth(el: RefObject<HTMLElement>) {
  const observer = useRef<ResizeObserver>();
  const [rect, setContentRect] = useState<DOMRectReadOnly | undefined>(
    el.current?.getBoundingClientRect(),
  );
  function updateBoundingClient() {
    return () => {
      setContentRect(el.current?.getBoundingClientRect());
    };
  }
  useEffect(() => updateBoundingClient(), [el.current]);
  useEffect(() => {
    observer.current = new ResizeObserver((observers) => {
      observers.forEach(updateBoundingClient());
    });
    observer.current.observe(el.current ?? document.body);
    return () => {
      observer.current?.disconnect();
    };
  }, []);
  return useMemo(() => rect?.width, [rect]);
}
