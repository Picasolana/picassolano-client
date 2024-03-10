import React from "react";

interface GivenImageProps {
  src: string;
  alt: string;
  description: string;
}

export const GivenImage: React.FC<GivenImageProps> = ({
  src,
  alt,
  description,
}) => {
  return (
    <div className="flex flex-col">
      <div className="p-5" />
      <div className="w-full h-[40vh]">
        <img src={src} alt={alt} className="rounded-lg h-full" />
      </div>
      <p className="text-md mt-2 font-semibold">{description}</p>
    </div>
  );
};
