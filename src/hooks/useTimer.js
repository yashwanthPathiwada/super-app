import { useCallback, useEffect, useRef, useState } from 'react';

const useTimer = () => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const intervalRef = useRef(null);

  const clearTick = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const tick = useCallback(() => {
    setRemaining((prev) => {
      if (prev <= 1) {
        clearTick();
        setIsRunning(false);
        setIsFinished(true);
        return 0;
      }
      return prev - 1;
    });
  }, []);

  const start = (hours, minutes, seconds) => {
    const total =
      Number(hours || 0) * 3600 + Number(minutes || 0) * 60 + Number(seconds || 0);

    if (total <= 0) return;

    clearTick();
    setTotalSeconds(total);
    setRemaining(total);
    setIsFinished(false);
    setIsRunning(true);
    intervalRef.current = setInterval(tick, 1000);
  };

  const pause = () => {
    clearTick();
    setIsRunning(false);
  };

  const resume = () => {
    if (remaining <= 0 || isRunning) return;
    setIsRunning(true);
    intervalRef.current = setInterval(tick, 1000);
  };

  const reset = () => {
    clearTick();
    setIsRunning(false);
    setIsFinished(false);
    setRemaining(0);
    setTotalSeconds(0);
  };

  const formatted = () => {
    const h = Math.floor(remaining / 3600);
    const m = Math.floor((remaining % 3600) / 60);
    const s = remaining % 60;
    return {
      hours: String(h).padStart(2, '0'),
      minutes: String(m).padStart(2, '0'),
      seconds: String(s).padStart(2, '0'),
    };
  };

  useEffect(() => {
    return () => clearTick();
  }, []);

  return {
    totalSeconds,
    remaining,
    isRunning,
    isFinished,
    start,
    pause,
    resume,
    reset,
    formatted,
  };
};

export default useTimer;
