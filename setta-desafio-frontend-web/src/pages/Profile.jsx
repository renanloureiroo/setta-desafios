import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { PlusCircleIcon, LogoutIcon } from "@heroicons/react/outline";

import { Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
import { formatTime } from "../utils/formatTime";

export const Profile = () => {
  const [metrics, setMetrics] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user, signOut } = useAuth();

  const handleFetchData = async () => {
    const { data: list } = await api.get(`/tasks`);
    const { data: metricsData } = await api.get(`tasks/metrics`);

    const tasksFormatted = list.map((task) => {
      return {
        ...task,
        focusedTime: formatTime(task.focusedTime),
        pausedTime: formatTime(task.pausedTime),
      };
    });
    console.log(tasksFormatted);
    setTasks(tasksFormatted);
    setMetrics({
      ...metricsData,
      biggestFocusTimeBlock: formatTime(metricsData.biggestFocusTimeBlock),
      averageFirstFocusTimeBlock: formatTime(
        metricsData.averageFirstFocusTimeBlock
      ),
    });
  };

  const currentHour = new Date().getHours();

  const greeting =
    currentHour < 12 && currentHour > 5
      ? "Bom dia"
      : currentHour < 18
      ? "Boa tarde"
      : "Boa noite";

  useEffect(() => {
    if (loading) {
      handleFetchData();
      setLoading(false);
    }
  }, [loading]);

  return (
    <div className="w-full min-h-screen max-w-screen-lg px-8 pt-3 mx-auto">
      <header className="h-20 flex flex-col space-y-2">
        <span className="text-2xl font-bold">
          {greeting}, {user.name}
        </span>

        <div className=" flex items-center justify-between">
          <Link
            to="/timer"
            className="flex items-center hover:text-blue-100 transition-colors"
          >
            Criar nova tarefa
            <PlusCircleIcon className="h-7 w-7 ml-2" />
          </Link>

          <button
            className="font-bold text-lg flex items-center justify-center px-4 py-2 bg-white rounded-lg  text-gray-700 hover:bg-blue-300 hover:text-white transition-colors"
            type="button"
          >
            Sair
            <LogoutIcon className="w-6 h-6 ml-2" />
          </button>
        </div>
      </header>
      <main className="flex flex-col mt-10">
        {!loading && metrics && (
          <>
            <section className="bg-white rounded-lg p-4 text-gray-900">
              <Chart
                options={{
                  labels: ["Foco", "Pausa"],
                }}
                series={[metrics.averageFocusedTime, metrics.averagePausedTime]}
                type="donut"
                height={350}
                width={350}
              />
              <div className="flex flex-col space-y-4 text-gray-600">
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

            <section className="text-gray-900">
              <div className="flex flex-col items-center space-y-4 mt-6">
                {!loading &&
                  tasks &&
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
        )}
      </main>
    </div>
  );
};
