import { XCircleIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BlockTime } from "../components/BlockTime";
import { TotalTime } from "../components/TotalTime";

import { api } from "../services/api";
import { formatTime } from "../utils/formatTime";

export const Report = () => {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await api.get(`/tasks/${id}`);
      setTask({
        ...data,
        focusedTime: formatTime(data.focusedTime),
        pausedTime: formatTime(data.pausedTime),

        timeBlocks: data.timeBlocks.map((block) => {
          return {
            ...block,
            time: formatTime(block.time),
          };
        }),
      });
      setIsLoading(false);
    } catch (err) {
      toast("Erro ao carregar dados!", {
        autoClose: 3000,
        type: "error",
        theme: "colored",
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!task.id) {
    return <h1>Carregando...</h1>;
  }
  return (
    <div className="w-full min-h-screen max-w-screen-lg px-8 flex flex-col items-center gap-6 mx-auto">
      <header className="flex w-full flex-col items-center justify-start gap-5 mt-10">
        <div className="flex justify-start w-full">
          <Link to={"/"}>
            <XCircleIcon className="h-10 w-10 text-white" />
          </Link>
        </div>
        {!isLoading ? (
          <>
            <h1 className="text-3xl lg:text-6xl font-bold">{task.name}</h1>
            <div className="flex items-center gap-8">
              <TotalTime title={"Foco total"} time={task.focusedTime} />
              <TotalTime title={"Pausa total"} time={task.pausedTime} />
            </div>
          </>
        ) : (
          <>
            <div className="h-12 w-40 bg-gray-300 animate-pulse rounded"></div>
            <div className="flex items-center gap-8 animate-pulse">
              <div className=" bg-gray-300 rounded h-12 w-20"></div>
              <div className=" bg-gray-300 rounded h-12 w-20"></div>
            </div>
          </>
        )}
      </header>

      <ul className="flex flex-col gap-4 w-full max-w-xs">
        {!isLoading
          ? task.timeBlocks.map((block) => (
              <BlockTime key={block.id} type={block.type} time={block.time} />
            ))
          : [1, 2, 3, 5, 6].map((item) => (
              <div className="bg-gray-300 text-gray-900 rounded w-full h-12 shadow-lg animate-pulse"></div>
            ))}
      </ul>
    </div>
  );
};
