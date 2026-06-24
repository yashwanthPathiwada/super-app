import { useEffect, useState } from 'react';
import useTimer from '../../hooks/useTimer';
import Button from '../common/Button';

const TimerWidget = () => {
  const [hoursInput, setHoursInput] = useState('0');
  const [minutesInput, setMinutesInput] = useState('1');
  const [secondsInput, setSecondsInput] = useState('0');

  const { remaining, isRunning, isFinished, start, pause, resume, reset, formatted } =
    useTimer();

  useEffect(() => {
    if (isFinished) {
      window.alert('Time is up! ⏰');
    }
  }, [isFinished]);

  const { hours, minutes, seconds } = formatted();
  const hasActiveTimer = remaining > 0 || isRunning;

  const handleStart = () => {
    start(hoursInput, minutesInput, secondsInput);
  };

  const handleReset = () => {
    reset();
    setHoursInput('0');
    setMinutesInput('1');
    setSecondsInput('0');
  };

  return (
    <div className="rounded-xl border border-line bg-panel p-5 shadow-card">
      <h3 className="mb-3 font-display text-lg font-semibold text-white">
        Timer
      </h3>

      {!hasActiveTimer ? (
        <div className="mb-4 grid grid-cols-3 gap-2">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] uppercase text-muted">Hours</label>
            <input
              type="number"
              min="0"
              value={hoursInput}
              onChange={(e) => setHoursInput(e.target.value)}
              className="focus-ring rounded-lg border border-line bg-panel2 px-2 py-2 text-center text-sm text-white"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[11px] uppercase text-muted">Minutes</label>
            <input
              type="number"
              min="0"
              max="59"
              value={minutesInput}
              onChange={(e) => setMinutesInput(e.target.value)}
              className="focus-ring rounded-lg border border-line bg-panel2 px-2 py-2 text-center text-sm text-white"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[11px] uppercase text-muted">Seconds</label>
            <input
              type="number"
              min="0"
              max="59"
              value={secondsInput}
              onChange={(e) => setSecondsInput(e.target.value)}
              className="focus-ring rounded-lg border border-line bg-panel2 px-2 py-2 text-center text-sm text-white"
            />
          </div>
        </div>
      ) : (
        <div className="mb-4 flex justify-center gap-2">
          {[hours, minutes, seconds].map((unit, idx) => (
            <div
              key={idx}
              className="flex h-16 w-16 items-center justify-center rounded-lg bg-panel2 font-display text-2xl font-bold text-white"
            >
              {unit}
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {!hasActiveTimer && (
          <Button onClick={handleStart} fullWidth>
            Start
          </Button>
        )}

        {hasActiveTimer && isRunning && (
          <Button onClick={pause} variant="secondary" className="flex-1">
            Pause
          </Button>
        )}

        {hasActiveTimer && !isRunning && remaining > 0 && (
          <Button onClick={resume} className="flex-1">
            Resume
          </Button>
        )}

        {hasActiveTimer && (
          <Button onClick={handleReset} variant="danger" className="flex-1">
            Reset
          </Button>
        )}
      </div>
    </div>
  );
};

export default TimerWidget;
