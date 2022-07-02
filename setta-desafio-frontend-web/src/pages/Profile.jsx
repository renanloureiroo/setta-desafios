import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { PlusCircleIcon, LogoutIcon } from "@heroicons/react/outline";

import { Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
import { formatTime } from "../utils/formatTime";
import { toast } from "react-toastify";

export const Profile = () => {
  const [metrics, setMetrics] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { user, signOut } = useAuth();

  const handleFetchData = async () => {
    try {
      const { data: list } = await api.get(`/tasks`);
      const { data: metricsData } = await api.get(`tasks/metrics`);
      console.log(metricsData);
      const tasksFormatted = list.map((task) => {
        return {
          ...task,
          focusedTime: formatTime(task.focusedTime),
          pausedTime: formatTime(task.pausedTime),
        };
      });
      setTasks(tasksFormatted);
      setMetrics({
        ...metricsData,
        biggestFocusTimeBlock: formatTime(metricsData.biggestFocusTimeBlock),
        averageFirstFocusTimeBlock: formatTime(
          metricsData.averageFirstFocusTimeBlock
        ),
      });
    } catch (err) {
      toast("Erro ao carregar dados!", {
        autoClose: 3000,
        type: "error",
        theme: "colored",
        position: "top-center",
      });
    }
  };

  const currentHour = new Date().getHours();

  const greeting =
    currentHour < 12 && currentHour > 5
      ? "Bom dia"
      : currentHour < 18
      ? "Boa tarde"
      : "Boa noite";

  useEffect(() => {
    if (isLoading) {
      handleFetchData();
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="w-full min-h-screen max-w-screen-lg px-8 py-3 mx-auto">
      <header className="h-20 flex flex-col lg:flex-row-reverse lg:items-center lg:justify-between space-y-2">
        <div className="flex items-center justify-between py-2 lg:justify-end border-b border-gray-300 lg:border-none">
          <Link
            to="/timer"
            className="flex items-center hover:text-blue-100 transition-colors"
          >
            <PlusCircleIcon className="h-10 w-10 mr-10" />
          </Link>

          <button
            className="font-bold text-lg flex items-center justify-center px-4 py-2 bg-white rounded-lg  text-gray-700 hover:bg-blue-300 hover:text-white transition-colors"
            type="button"
            onClick={signOut}
          >
            Sair
            <LogoutIcon className="w-6 h-6 ml-2" />
          </button>
        </div>
        <span className="text-2xl font-bold">
          {greeting}, {user.name}
        </span>
      </header>
      <main className="flex flex-col mt-10">
        {!isLoading && !!metrics ? (
          <>
            <section className="bg-white rounded-lg p-4 text-gray-900 flex flex-col lg:flex-row items-center lg:justify-center">
              <Chart
                options={{
                  labels: ["Foco", "Pausa"],
                }}
                series={[metrics.averageFocusedTime, metrics.averagePausedTime]}
                type="donut"
                height={350}
                width={350}
              />

              <div className="flex flex-col space-y-4 text-gray-600 lg:text-lg">
                <span>
                  Média do primeiro bloco focado:{" "}
                  <strong className="font-mono text-gray-900">
                    {metrics.averageFirstFocusTimeBlock}
                  </strong>
                </span>

                <span>
                  Maior tempo focado:{" "}
                  <strong className="font-mono text-gray-900">
                    {metrics.biggestFocusTimeBlock}
                  </strong>
                </span>
              </div>
            </section>

            <section className="text-gray-900  mt-6">
              <div className="flex flex-col items-center space-y-4">
                {!isLoading &&
                  tasks.map((task) => (
                    <Link key={task.id} to={`/task/${task.id}`}>
                      <div className=" bg-white rounded-lg p-3 flex flex-col border-2 border-blue-300 items-center  min-w-[300px] hover:border-white hover:bg-blue-300 hover:text-white transition-colors">
                        <span className="border-b w-full text-center font-bold text-lg">
                          {task.name}
                        </span>
                        <div className="flex w-full items-center justify-center divide-x-2 font-mono">
                          <span className="p-2">Foco: {task.focusedTime}</span>

                          <span className="p-2">Pausa: {task.pausedTime}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </section>
          </>
        ) : (
          <>
            <div className="bg-gray-300 rounded-lg p-4 space-y-8 animate-pulse">
              <div className="h-[200px] w-[200px] rounded-full bg-gray-200" />
              <div className="flex flex-col space-y-4">
                <span className="h-5 w-full rounded bg-gray-200"></span>
                <span className="h-5 w-full rounded bg-gray-200"></span>
              </div>
            </div>

            <section className="text-gray-900  mt-6 animate-pulse">
              <div className="flex flex-col items-center space-y-4">
                {!isLoading &&
                  [1, 2, 3].map((task) => (
                    <div
                      key={task}
                      className="h-36 w-full max-w-96 bg-gray-300 rounded"
                    ></div>
                  ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};
