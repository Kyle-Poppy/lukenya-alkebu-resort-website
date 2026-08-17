import { useLayoutEffect, useState } from "react";

export function useSize(ref) {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const updateSize = () => {
      const { width, height } = element.getBoundingClientRect();

      setSize({
        width,
        height,
      });
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);

    observer.observe(element);

    return () => {
      // Performance: Disconnect using the captured element reference to ensure cleanup safety
      observer.disconnect();
    };
  }, [ref]);

  return size;
}