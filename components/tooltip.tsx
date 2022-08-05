import { ReactNode } from "react";

export const Tooltip = ({
  message,
  children,
}: {
  message: string;
  children: ReactNode;
}) => {
  return (
    <div className="relative flex flex-col items-center group">
      {children}
      <div className="absolute left-0 mt-auto mb-auto ml-14 flex-col items-center hidden group-hover:flex">
        <span className="relative z-10 p-2 mt-4 text-xs leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">
          {message}
        </span>
        <div className="w-3  h-3 -mt-5 -ml-1.5 mr-auto mb-auto bg-gray-600" style={{transform :'rotate(45deg)'}}></div>
      </div>
    </div>
  );
};
