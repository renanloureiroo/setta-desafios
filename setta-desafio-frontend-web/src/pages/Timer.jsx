import { RefreshIcon, PlayIcon, PauseIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../components/Button";

import { api } from "../services/api";

import { formatTime } from "../utils/formatTime";

export const Timer = () => {
  const [time, setTime] = useState(0);

  const [focusTime, setFocusTime] = useState(0);
  const [pausedTime, setPausedTime] = useState(0);

  const [isFinish, setIsFinish] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [timeFormatted, setTimeFormatted] = useState("");

  const [timeBlocks, setTimeBlocks] = useState([]);
  const navigate = useNavigate();

  const handleReset = () => {
    setTime(0);
    setFocusTime(0);
    setPausedTime(0);
    setIsFinish(false);
    setIsActive(false);
    setIsPaused(false);
    setTimeFormatted("");
    setTimeBlocks([]);
  };

  const handleCreateTask = async (timeBlocks) => {
    try {
      const times = timeBlocks.reduce(
        (acc, curr) => {
          if (curr.type === "focus") {
            return {
              ...acc,
              focusedTime: acc.focusedTime + curr.time,
            };
          } else {
            return {
              ...acc,
              pausedTime: acc.pausedTime + curr.time,
            };
          }
        },
        {
          focusedTime: 0,
          pausedTime: 0,
        }
      );

      const { data } = await api.post("/tasks", {
        name: "tarefa",
        focusedTime: times.focusedTime,
        pausedTime: times.pausedTime,
        blocks: timeBlocks,
      });

      toast("Tarefa salva!", {
        autoClose: 3000,
        type: "success",
        theme: "colored",
        position: "top-center",
      });

      navigate(`/task/${data.id}`);
    } catch (err) {
      toast("Erro ao salvar os dados da execução da tarefa!", {
        autoClose: 3000,
        type: "error",
        theme: "colored",
        position: "top-center",
      });
    }
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
    } else if (isPaused && !isActive) {
      setTimeBlocks((old) => [...old, { type: "pause", time: pausedTime }]);
    }
    setIsFinish(true);
  };
  useEffect(() => {
    if (isFinish) {
      handleCreateTask(timeBlocks);
    }
  }, [isFinish]);

  useEffect(() => {
    let interval = null;
    if (!isFinish) {
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
    }
    return () => {
      clearInterval(interval);
    };
  }, [isPaused, isActive, isFinish]);

  useEffect(() => {
    const timeFormatted = formatTime(time);
    setTimeFormatted(timeFormatted);
  }, [time]);

  return (
    <main className="w-full min-h-screen max-w-screen-lg px-8 flex flex-col items-center justify-center mx-auto">
      <h1 className="text-3xl mb-48">Tarefa</h1>

      <span className="text-white text-7xl tracking-tighter font-mono mb-48">
        {timeFormatted}
      </span>

      <div className="flex items-center justify-between w-full max-w-xs">
        <Button onClick={handleReset}>
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
        <Button onClick={handleFinish}>Finalizar</Button>
      </div>
    </main>
  );
};
