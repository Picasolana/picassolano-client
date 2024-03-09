import React from "react";

interface TitleProps {
  text: string;
}

export const Title: React.FC<TitleProps> = ({ text }) => {
  return (
    <h1 className="font-bold tracking-wider text-xl md:text-2xl">{text}</h1>
  );
};
