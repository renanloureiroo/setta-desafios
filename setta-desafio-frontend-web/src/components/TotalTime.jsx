export const TotalTime = ({ title, time }) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-white text-opacity-60">{title}</span>
      <span className="text-4xl font-mono">{time}</span>
    </div>
  );
};
