import { forwardRef } from "react";

const InputBase = ({ error, ...rest }, ref) => {
  return (
    <div className="flex flex-col h-12">
      <input
        {...rest}
        className="border-b border-gray-300 py-1 px-2 outline-none placeholder:text-gray-400  hover:placeholder:text-gray-500  hover:border-gray-400 focus:border-brand-blue  transition-all"
        ref={ref}
      />
      {!!error && (
        <strong className="text-red-500 text-xs mt-2">{error.message}</strong>
      )}
    </div>
  );
};

export const Input = forwardRef(InputBase);
