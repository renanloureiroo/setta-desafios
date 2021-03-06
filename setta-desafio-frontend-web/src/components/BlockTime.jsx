export const BlockTime = ({ type, time }) => {
  return (
    <li className="px-4 py-3 bg-white text-gray-900 rounded-2xl text-lg lg:text-xl flex-1 shadow-lg font-mono">
      <strong className="font-sans">
        {type === "focus" ? "Foco" : "Pausa"}
      </strong>
      : {time}
    </li>
  );
};
