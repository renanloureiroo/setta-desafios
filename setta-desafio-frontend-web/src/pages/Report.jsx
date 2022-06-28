import { BlockTime } from "../components/BlockTime";
import { TotalTime } from "../components/TotalTime";
import { WrapperGradient } from "../components/WrapperGradient";

export const Report = () => {
  return (
    <WrapperGradient>
      <div className="w-full h-full max-w-screen-lg px-8 flex flex-col items-center gap-6">
        <header className="flex flex-col items-center justify-start gap-5 mt-10">
          <h1 className="text-3xl font-bold">Tarefa</h1>

          <div className="flex items-center gap-8">
            <TotalTime title={"Foco total"} time={"18:09"} />
            <TotalTime title={"Pausa total"} time={"18:09"} />
          </div>
        </header>

        <ul className="flex flex-col gap-4 w-full">
          <BlockTime type={"Foco"} time={"16:00"} />
          <BlockTime type={"Pausa"} time={"16:00"} />
          <BlockTime type={"Foco"} time={"16:00"} />
          <BlockTime type={"Pausa"} time={"16:00"} />
        </ul>
      </div>
    </WrapperGradient>
  );
};
