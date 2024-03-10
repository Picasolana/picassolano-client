import { Modal } from "flowbite-react";
import { useState } from "react";
import { saveUserResult } from "../api/userGuess.api";
import { useUser } from "../hooks/useUser";
import ConnectWallet from "./ConnectWallet";
import { getProvider } from "../utils/connectWallet";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../utils/cookie";
import { TelegramForm } from "./EnterTelegram";

interface EnterEmailProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

const EmailForm: React.FC<{
  setIsEmail: (value: boolean) => void;
}> = ({ setIsEmail }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { sessionId, setUserIdentifier } = useUser();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    setUserIdentifier(email);
    setCookie("userIdentifier", email, 1);
    try {
      const res = await saveUserResult({
        sessionId,
        identifier: email,
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
    setIsEmail(false);
  };
  return (
    <form className="flex flex-col gap-4 mx-auto" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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

export const EnterEmailModal: React.FC<EnterEmailProps> = ({
  openModal,
  setOpenModal,
}) => {
  const [isEmail, setIsEmail] = useState(false);
  const [isTelegram, setIsTelegram] = useState(false);

  const [isWalletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [error, setError] = useState<Error | undefined>(undefined);

  const handleToggleConnect = async () => {
    setError(undefined); // clear error state
    const provider = getProvider();
    try {
      if (provider) {
        const resp = await provider?.connect();
        setWalletAddress(resp.publicKey.toString());
        setWalletConnected(true);
      }
      // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo
    } catch (err) {
      setError(err as Error);
    }
  };

  return (
    <>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body>
          <div className="flex flex-col gap-4">
            {isEmail ? (
              <EmailForm setIsEmail={setIsEmail} />
            ) : isTelegram ? (
              <TelegramForm setIsTelegram={setIsTelegram} />
            ) : isWalletConnected && walletAddress ? (
              <ConnectWallet
                status={isWalletConnected}
                walletAddress={walletAddress}
                error={error?.message}
              />
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setIsEmail(true)}
                  className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                >
                  Enter your email
                </button>
                <button
                  type="button"
                  onClick={() => setIsTelegram(true)}
                  className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-100"
                >
                  Enter your telegram handle
                </button>
                <button
                  type="button"
                  onClick={handleToggleConnect}
                  className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-green-800 shadow-sm hover:bg-green-100"
                >
                  Connect your wallet
                </button>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
