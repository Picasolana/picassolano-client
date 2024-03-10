import { useState } from "react";
import { saveUserResult } from "../api/userGuess.api";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../utils/cookie";

export const TelegramForm: React.FC<{
  setIsTelegram: (value: boolean) => void;
}> = ({ setIsTelegram }) => {
  const [telegram, setTelegram] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { sessionId, setUserIdentifier } = useUser();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    setUserIdentifier(telegram);
    setCookie("userIdentifier", telegram, 1);
    try {
      const res = await saveUserResult({
        sessionId,
        identifier: telegram,
      });
      if (res.ok) {
        setLoading(false);
        navigate("/leaderboard");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleBack = () => {
    setIsTelegram(false);
  };
  return (
    <form className="flex flex-col gap-4 mx-auto" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your Telegram handle"
        value={telegram}
        onChange={(e) => setTelegram(e.target.value)}
        className="rounded-md border-2 border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent w-[300px]"
      />
      <div className="flex gap-3 justify-between">
        <button
          type="button"
          onClick={handleBack}
          className="rounded-md bg-white-600 text-sm font-semibold text-black shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grey-500 outline-black outline-2 outline-solid border-gray-700 border-1 border-solid"
        >
          Back
        </button>
        <button
          type="submit"
          className="flex gap-3 justify-center rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : null}
          {loading ? "Processing" : "Submit"}
        </button>
      </div>
    </form>
  );
};
