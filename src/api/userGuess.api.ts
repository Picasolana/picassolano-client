require("dotenv").config();
// const mockData = {
//   data: {
//     sessionId: "aaa1",
//     identifier: "abc@abc.com",
//     userGuess: [
//       {
//         id: "0",
//         text: "this is a placeholder image",
//         src: "https://via.placeholder.com/300",
//         score: 0.98,
//       },
//       {
//         id: "1",
//         text: "this is another placeholder image 2",
//         src: "https://via.placeholder.com/300",
//         score: 0.8,
//       },
//     ],
//   },
// };

interface UserGuess {
  id: string;
  text: string;
  src: string;
  score: number;
}

interface UserGuessPost {
  sessionId?: string;
  userGuess: UserGuess;
}

const baseURL = process.env.REACT_APP_API_URL;

export const postUserGuess = async (data: UserGuessPost) => {
  const response = await fetch(`${baseURL}/api/contest/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessionId: data.sessionId,
      prompt: data.userGuess.text,
    }),
  });
  return await response.json();
};

interface UserResult {
  index: number;
  sessionId: string;
  prompt: string;
  image: string;
  score: number;
}

export const getUserResult = async (data: {
  sessionId: string;
  index: number;
}): Promise<UserResult> => {
  const response = await fetch(
    `${baseURL}/api/contest/submission/${data.sessionId}/${data.index}`
  );
  return await response.json();
};

export const getSessionId = async () => {
  const response = await fetch(`${baseURL}/api/session/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  return await response.json();
};

export const saveUserResult = async (data: {
  identifier: string;
  sessionId: string;
}) => {
  const response = await fetch(`${baseURL}/api/session/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: data.identifier, sessionId: data.sessionId }),
  });
  return response;
};
