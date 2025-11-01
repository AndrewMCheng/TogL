import { useState, useEffect, useRef } from "react";

export function useTimer({ hasStarted, victory, resetKey, difficulty, initialSeconds }) {
  const [secondsElapsed, setSecondsElapsed] = useState(initialSeconds || 0);
  const intervalRef = useRef(null);

  // Reset timer when difficulty changes or resetKey toggles
  useEffect(() => {
    setSecondsElapsed(initialSeconds || 0);
  }, [difficulty, resetKey, initialSeconds]);

  // Timer effect
  useEffect(() => {
    if (!hasStarted || victory) return;

    intervalRef.current = setInterval(() => {
      setSecondsElapsed(prev => prev + 10); // tick in ms
    }, 10);

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [hasStarted, victory, difficulty, resetKey]);

  return [secondsElapsed, setSecondsElapsed];
}