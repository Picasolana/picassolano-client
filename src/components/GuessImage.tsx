import { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const { userGuess, sessionId, userIdentifier, setUserGuess } = useUser();
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
  const [submitBtnText, setSubmitBtnText] = useState("Submit");
  const maxIndex = userGuessData.length - 1;
  const currentIndex = Number(currentGuess?.id);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (
      userGuess.length === 5 &&
      currentGuess.src.includes("data:image/jpeg;base64")
    ) {
      setSubmitBtnText("Go to Leaderboard");
    }
  }, [userGuess, currentGuess]);

  const handleSubmit = async () => {
    setLoading(true);
    const newGuess = {
      ...emptyGuess,
      text: guessText,
    };
    if (
      currentGuess.id === "4" &&
      currentGuess.src.includes("data:image/jpeg;base64")
    ) {
      if (!userIdentifier) {
        setOpenModal(true);
        setLoading(false);
      } else {
        const res = await saveUserResult({
          identifier: userIdentifier,
          sessionId,
        });
        if (res.ok) {
          navigate("/leaderboard");
        }
        setLoading(false);
      }
      return;
    }
    /**
     * ask user for email or wallet address after the last guess
     */
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

    setCurrentGuess({
      id: userGuessData.index.toString(),
      text: userGuessData.prompt,
      src: "data:image/jpeg;base64," + userGuessData.image,
      score: userGuessData.score,
    });
    setGuessText(userGuessData.prompt);

    setLoading(false);

    if (newGuess.id === "4") {
      if (!userIdentifier) {
        setOpenModal(true);
      } else {
        const res = await saveUserResult({
          identifier: userIdentifier,
          sessionId,
        });
        if (res.ok) {
          navigate("/leaderboard");
        }
      }
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
              className="border-2 border-solid text-cyan-800 border-gray-300 rounded-md w-full h-[100px] py-2 px-3 text-wrap whitespace-nowrap disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-50 disabled:resize-none"
              onChange={(e) => setGuessText(e.target.value)}
              disabled={currentGuess.text ? true : false}
              rows={4}
            />
          </div>
          <SubmitButton
            btnText={submitBtnText}
            onClick={handleSubmit}
            loading={loading}
            disabled={
              guessText !== "" &&
              Number(currentGuess.id) === maxIndex &&
              Number(currentGuess.id) < 5
                ? false
                : true
            }
          />
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
