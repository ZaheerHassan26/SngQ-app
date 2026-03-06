import { useEffect, useMemo, useRef, useState } from 'react';

const TOAST_DURATION = 1500;

export const useAppToastProvider = () => {
  const [queue, setQueue] = useState([]);
  const timeoutRef = useRef(null);

  const value = useMemo(
    () => ({
      hideAll: () => setQueue([]),
      show: (options) => {
        setQueue((prev) => [...prev, options]);
        return () => {
          setQueue((prev) => prev.filter((m) => m !== options));
        };
      },
    }),
    []
  );

  const toast = queue[queue?.length - 1];

  useEffect(() => {
    if (!toast || toast.autoHide === false) return;
    const id = setTimeout(() => {
      setQueue((prev) => prev.slice(0, -1));
    }, TOAST_DURATION);
    timeoutRef.current = id;
    return () => clearTimeout(id);
  }, [toast]);

  return { value, toast };
};
