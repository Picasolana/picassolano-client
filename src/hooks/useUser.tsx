import React, { createContext, useContext, useEffect, useState } from "react";
import { getSessionId } from "../api/userGuess.api";
import { getCookie } from "../utils/cookie";

export interface UserGuess {
  id: string;
  text: string;
  src: string;
  score: number;
}

// Define the type for your context value
interface UserContextType {
  sessionId: string;
  setSessionId: (value: string) => void;
  userIdentifier: string;
  setUserIdentifier: (value: string) => void;
  userGuess: UserGuess[];
  setUserGuess: (value: UserGuess[]) => void;
  userAttempt: number;
  setUserAttempt: (value: number) => void;
}

// Create the initial context with default values
const UserContext = createContext<UserContextType>({
  sessionId: "",
  setSessionId: () => {},
  userIdentifier: "",
  setUserIdentifier: () => {},
  userGuess: [],
  setUserGuess: () => {},
  userAttempt: 0,
  setUserAttempt: () => {},
});

// Provider component to wrap your application
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sessionId, setSessionId] = useState("");
  const [userAttempt, setUserAttempt] = useState(0);
  const [userIdentifier, setUserIdentifier] = useState("");
  const [userGuess, setUserGuess] = useState<UserGuess[]>([]);
  const userIdentifierFromCookie = getCookie("userIdentifier");

  useEffect(() => {
    if (userIdentifierFromCookie) {
      setUserIdentifier(userIdentifierFromCookie);
    }
  }, [userIdentifierFromCookie]);

  useEffect(() => {
    if (!sessionId) {
      const fetchSessionId = async () => {
        const sessionIdData = await getSessionId();
        setSessionId(sessionIdData.sessionId);
      };
      fetchSessionId();
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        sessionId,
        setSessionId,
        userIdentifier,
        setUserIdentifier,
        userGuess,
        setUserGuess,
        userAttempt,
        setUserAttempt,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access the context
export const useUser = () => {
  return useContext(UserContext);
};
