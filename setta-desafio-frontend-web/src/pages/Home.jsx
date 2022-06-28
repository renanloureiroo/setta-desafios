import { RefreshIcon, PlayIcon, PauseIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { WrapperGradient } from "../components/WrapperGradient";

export const Home = () => {
  const [time, setTime] = useState(0);

  const [focusTime, setFocusTime] = useState(0);
  const [pausedTime, setPausedTime] = useState(0);

  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [timeFormatted, setTimeFormatted] = useState("");

  const [timeBlocks, setTimeBlocks] = useState([]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);

    const seconds = time % 60;

    return minutes === 0 && seconds < 10
      ? `00:0${seconds}`
      : seconds < 10
      ? `${minutes}:0${seconds}`
      : minutes === 0
      ? `00:${seconds}`
      : minutes < 10
      ? `0${minutes}:${seconds}`
      : `${minutes}:${seconds}`;
  };

  const handlePlay = () => {
    if (time !== 0) {
      setTimeBlocks((old) => [...old, { type: "pause", time: pausedTime }]);
    }
    setIsActive(true);
    setIsPaused(false);

    setPausedTime(0);
  };

  const handlePause = () => {
    setTimeBlocks((old) => [...old, { type: "focus", time: focusTime }]);

    setIsActive(false);
    setIsPaused(true);

    setFocusTime(0);
  };

  const handleFinish = () => {
    if (isActive && !isPaused) {
      setTimeBlocks((old) => [...old, { type: "focus", time: focusTime }]);
    } else {
      setTimeBlocks((old) => [...old, { type: "pause", time: pausedTime }]);
    }

    setFocusTime(0);
    setIsPaused(0);
    setTime(0);
  };

  useEffect(() => {
    let interval = null;
    if (!isPaused && isActive) {
      interval = setInterval(() => {
        setTime((value) => value + 1);
        setFocusTime((value) => value + 1);
      }, 1000);
    } else if (isPaused && !isActive) {
      interval = setInterval(() => {
        setPausedTime((value) => value + 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isPaused, isActive]);

  useEffect(() => {
    const timeFormatted = formatTime(time);
    setTimeFormatted(timeFormatted);
  }, [time]);

  return (
    <WrapperGradient>
      <div className="w-full h-full max-w-screen-lg px-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl mb-48">Tarefa</h1>

        <span className="text-white text-7xl tracking-tighter font-mono mb-48">
          {timeFormatted}
        </span>

        <div className="flex items-center justify-between w-full max-w-xs">
          <Button>
            <RefreshIcon className="h-5 w-5" />
            Zerar
          </Button>
          {isActive ? (
            <Button variant="secondary" onClick={handlePause}>
              <PauseIcon className="h-10 w-10" />
            </Button>
          ) : (
            <Button variant="secondary" onClick={handlePlay}>
              <PlayIcon className="h-10 w-10" />
            </Button>
          )}
          <Button>Finalizar</Button>
        </div>
      </div>
    </WrapperGradient>
  );
};
