import { useEffect, useRef } from 'react';

const useInterval = (callback, delay) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null || delay === undefined) return undefined;

    const id = setInterval(() => {
      callbackRef.current();
    }, delay);

    return () => clearInterval(id);
  }, [delay]);
};

export default useInterval;
