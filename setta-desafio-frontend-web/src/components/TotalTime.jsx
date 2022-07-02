export const TotalTime = ({ title, time }) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-white lg:text-2xl text-opacity-60">{title}</span>
      <span className="text-4xl lg:text-6xl font-mono">{time}</span>
    </div>
  );
};
