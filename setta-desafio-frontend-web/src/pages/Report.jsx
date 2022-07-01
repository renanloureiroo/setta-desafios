import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BlockTime } from "../components/BlockTime";
import { TotalTime } from "../components/TotalTime";

import { api } from "../services/api";
import { formatTime } from "../utils/formatTime";

export const Report = () => {
  const { id } = useParams();
  const [task, setTask] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get(`/tasks/${id}`);
      setTask({
        ...data,
        focusedTime: formatTime(data.focusedTime),
        pausedTime: formatTime(data.pausedTime),

        timeBlocks: data.BlocksTime.map((block) => {
          return {
            ...block,
            time: formatTime(block.time),
          };
        }),
      });
      console.log(data);
    };
    fetchData();
  }, [id]);

  if (!task.id) {
    return <h1>Carregando...</h1>;
  }
  return (
    <div className="w-full min-h-screen max-w-screen-lg px-8 flex flex-col items-center gap-6 mx-auto">
      <header className="flex flex-col items-center justify-start gap-5 mt-10">
        <h1 className="text-3xl font-bold">{task.name}</h1>

        <div className="flex items-center gap-8">
          <TotalTime title={"Foco total"} time={task.focusedTime} />
          <TotalTime title={"Pausa total"} time={task.pausedTime} />
        </div>
      </header>

      <ul className="flex flex-col gap-4 w-full">
        {task.timeBlocks.map((block) => (
          <BlockTime key={block.id} type={block.type} time={block.time} />
        ))}
      </ul>
    </div>
  );
};
