import React, { useState } from "react";
import Chevron from "react-chevron";
import SubmitButton from "./SubmitButton";
import { EnterEmailModal } from "./EnterEmail";
interface UserGuess {
  id: string;
  guess: {
    text: string;
    src: string;
    score: number;
  };
}

interface GivenImageProps {
  userGuess: UserGuess[];
}

export const GuessImage: React.FC<GivenImageProps> = ({ userGuess }) => {
  const [currentGuess, setCurrentGuess] = useState(userGuess[0]);
  const [guessText, setGuessText] = useState(currentGuess.guess.text || "");
  const maxIndex = userGuess.length - 1;
  const currentIndex = Number(currentGuess?.id);
  const [openModal, setOpenModal] = useState(false);

  const handleClickPrevious = () => {
    if (Number(currentGuess.id) > 0) {
      setCurrentGuess(userGuess[currentIndex - 1]);
      setGuessText(userGuess[currentIndex - 1].guess.text);
    }
  };

  const handleSubmit = () => {
    setOpenModal(true);
  };

  const handleClickNext = () => {
    if (Number(currentGuess.id) <= maxIndex) {
      setCurrentGuess(userGuess[currentIndex + 1]);
      setGuessText(userGuess[currentIndex + 1].guess.text);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        {currentIndex !== 0 ? (
          <div
            className="flex items-center justify-center mt-[45%] text-[1.5rem] rounded-full bg-blue-200 h-8 w-8 cursor-pointer hover:bg-blue-400"
            onClick={handleClickPrevious}
          >
            <Chevron direction="left" className="p-1" />
          </div>
        ) : (
          <div className="w-8" />
        )}

        <div className="flex flex-col gap-4 h-full">
          <h3 className="font-semibold text-center">
            Score:{" "}
            {Number(currentGuess.guess.score).toLocaleString(undefined, {
              style: "percent",
            })}
          </h3>
          <div className="flex flex-col gap-4">
            <div className="w-full h-[40vh]">
              <img
                src={currentGuess.guess.src}
                alt={currentGuess.guess.text}
                className="rounded-lg h-full"
              />
            </div>
            <textarea
              value={guessText}
              placeholder="Enter your guess here"
              className="border-2 border-solid border-gray-300 rounded-md w-full h-[100px] py-2 px-3 text-wrap whitespace-nowrap disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-50 disabled:resize-none"
              onChange={(e) => setGuessText(e.target.value)}
              disabled={currentGuess.guess.text ? true : false}
            />
          </div>
          <SubmitButton btnText="Submit" onClick={handleSubmit} />
        </div>
        {currentIndex < maxIndex ? (
          <div
            className="flex items-center justify-center mt-[45%] text-[1.5rem] rounded-full bg-blue-200 h-8 w-8 cursor-pointer hover:bg-blue-400 pl-2"
            onClick={handleClickNext}
          >
            <Chevron direction="right" className="p-1" />
          </div>
        ) : (
          <div className="w-8" />
        )}
      </div>
      <EnterEmailModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};
