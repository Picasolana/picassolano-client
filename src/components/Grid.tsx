import React, { ReactNode } from "react";

interface GridProps {
  children: ReactNode;
}

const Grid: React.FC<GridProps> = ({ children, ...rest }) => {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 w-full"
      {...rest}
    >
      {children}
    </div>
  );
};

export default Grid;
