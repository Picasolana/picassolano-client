import { useState } from "react";
import Chevron from "react-chevron";
import SubmitButton from "./SubmitButton";
import { EnterEmailModal } from "./EnterEmail";
import { UserGuess, useUser } from "../hooks/useUser";
import {
  getUserResult,
  postUserGuess,
  saveUserResult,
} from "../api/userGuess.api";
import { useNavigate } from "react-router-dom";

const displayAttempts = (currentGuess: UserGuess) => {
  switch (currentGuess.id) {
    case "0":
      return "1st Attempt";
    case "1":
      return "2nd Attempt";
    case "2":
      return "3rd Attempt";
    case "3":
      return "4th Attempt";
    case "4":
      return "5th Attempt";
    default:
      return "";
  }
};

export const GuessImage = () => {
  const { userGuess, sessionId, userIdentifier, setUserGuess, setUserAttempt } =
    useUser();
  const emptyGuess = {
    id: userGuess?.length?.toString(),
    text: "",
    src: "https://via.placeholder.com/300",
    score: 0,
  };
  const userGuessData =
    userGuess.length < 5 ? [...userGuess, emptyGuess] : userGuess;
  const [currentGuess, setCurrentGuess] = useState(
    userGuessData[userGuessData.length - 1]
  );
  const [guessText, setGuessText] = useState(currentGuess.text || "");
  const maxIndex = userGuessData.length - 1;
  const currentIndex = Number(currentGuess?.id);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  console.log("userGuess", userGuess);

  const handleClickPrevious = () => {
    if (Number(currentGuess.id) > 0) {
      setCurrentGuess(userGuessData[currentIndex - 1]);
      setGuessText(userGuessData[currentIndex - 1].text);
    }
  };
  const handleClickNext = () => {
    if (Number(currentGuess.id) <= maxIndex) {
      setCurrentGuess(userGuessData[currentIndex + 1]);
      setGuessText(userGuessData[currentIndex + 1].text);
    }
  };

  const handleSubmit = async () => {
    const newGuess = {
      ...emptyGuess,
      text: guessText,
    };
    setUserGuess([...userGuess, newGuess]);
    setCurrentGuess(newGuess);
    /**
     * ask user for email or wallet address after the last guess
     */
    if (newGuess.id === "4") {
      if (!userIdentifier) {
        setOpenModal(true);
      } else {
        await postUserGuess({
          sessionId,
          userGuess: newGuess,
        });
        const res = await saveUserResult({
          identifier: userIdentifier,
          sessionId,
        });
        const userGuessData = await getUserResult({
          sessionId,
          index: Number(newGuess.id),
        });
        setUserGuess([
          ...userGuess.slice(0, Number(newGuess.id)),
          {
            id: userGuessData.index.toString(),
            text: userGuessData.prompt,
            src: userGuessData.image,
            score: userGuessData.score,
          },
        ]);
        if (res.ok) {
          navigate("/leaderboard");
        }
      }
    } else {
      await postUserGuess({
        sessionId,
        userGuess: newGuess,
      });
      const userGuessData = await getUserResult({
        sessionId,
        index: Number(newGuess.id),
      });
      setUserGuess([
        ...userGuess.slice(0, Number(newGuess.id)),
        {
          id: userGuessData.index.toString(),
          text: userGuessData.prompt,
          src: "data:image/jpeg;base64," + userGuessData.image,
          score: userGuessData.score,
        },
      ]);
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
            {`${displayAttempts(currentGuess)} - Score: 
            ${
              Number(currentGuess.score) > 0
                ? Number(currentGuess.score).toLocaleString() + "%"
                : "?"
            }`}
          </h3>
          <div className="flex flex-col gap-4">
            <div className="w-full h-[40vh]">
              <img
                src={currentGuess.src}
                alt={currentGuess.text}
                className="rounded-lg h-full"
              />
            </div>
            <textarea
              value={guessText}
              placeholder="Enter your guess here"
              className="border-2 border-solid border-gray-300 rounded-md w-full h-[100px] py-2 px-3 text-wrap whitespace-nowrap disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-50 disabled:resize-none"
              onChange={(e) => setGuessText(e.target.value)}
              disabled={currentGuess.text ? true : false}
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
