import { useNavigate } from "react-router-dom";
import { postUserGuess, saveUserResult } from "../api/userGuess.api";
import { useUser } from "../hooks/useUser";
import { setCookie } from "../utils/cookie";

interface ConnectWalletProps {
  status: boolean;
  walletAddress: string;
  error?: string;
}

export const ConnectWallet: React.FC<ConnectWalletProps> = ({
  status,
  walletAddress,
  error,
}) => {
  const { setUserIdentifier, sessionId } = useUser();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    setUserIdentifier(walletAddress);
    setCookie("userIdentifier", walletAddress, 1);
    await saveUserResult({
      sessionId,
      identifier: walletAddress,
    });
    navigate("/leaderboard");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2 text-xl">
        {`Status: ${status ? "Connected" : "Not Connected"}`}
      </div>
      {error ? (
        <div className="font-sans font-normal text-neutral-600 text-md dark:text-neutral-300">
          {`Error: ${error}`}
        </div>
      ) : (
        <div className="font-sans font-normal text-neutral-600 text-md dark:text-neutral-300">
          {`Address: ${walletAddress}`}
        </div>
      )}
      <button
        type="button"
        onClick={handleSubmit}
        className="rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 self-end"
      >
        Submit
      </button>
    </div>
  );
};

export default ConnectWallet;
