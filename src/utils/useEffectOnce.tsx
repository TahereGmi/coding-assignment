import { useEffect, useRef } from 'react';

export const useEffectOnce = (effect: () => void | (() => void)) => {
    // 1. Refs to hold the state across renders without causing re-renders.
    const cleanupFunction = useRef<void | (() => void)>();
    const effectCalled = useRef(false);

    // 2. useEffect hook to handle the lifecycle.
    useEffect(() => {
      // 3. Check if the effect has already been called.
      if (!effectCalled.current) {
        // 4. Call the effect function and store any cleanup function.
        cleanupFunction.current = effect();
        // 5. Mark that the effect has been called.
        effectCalled.current = true;
      }

      // 6. Return a cleanup function.
      return () => {
        // 7. If a cleanup function is provided, call it during the component unmount.
        if (cleanupFunction.current) {
          cleanupFunction.current();
        }
      };
    }, []); // 8. An empty dependency array ensures this runs only once (on mount).
};
