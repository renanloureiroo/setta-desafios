export const Button = ({ children, variant = "primary", onClick }) => {
  if (variant !== "primary") {
    return (
      <button
        type="button"
        className="flex items-center justify-center gap-1 p-2 rounded-full bg-white text-gray-900 font-bold  hover:bg-slate-100 transition-colors"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-1 px-4 py-2 rounded-full bg-white text-gray-900 font-medium  hover:bg-slate-100 transition-colors"
    >
      {children}
    </button>
  );
};
