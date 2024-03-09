const mockData = {
  data: {
    sessionId: "aaa1",
    identifier: "abc@abc.com",
    userGuess: [
      {
        id: "0",
        text: "this is a placeholder image",
        src: "https://via.placeholder.com/300",
        score: 0.98,
      },
      {
        id: "1",
        text: "this is another placeholder image 2",
        src: "https://via.placeholder.com/300",
        score: 0.8,
      },
    ],
  },
};

interface UserGuess {
  id: string;
  text: string;
  src: string;
  score: number;
}

interface UserGuessPost {
  sessionId?: string;
  identifier: string;
  userGuess: UserGuess[];
}

export const getUserGuess = async (url?: string) => {
  const response = url ? await fetch(`/api/guessImage?url=${url}`) : "";
  return response ? response.json() : mockData;
};

export const postUserGuess = async (data: UserGuessPost) => {
  const response = await fetch("/api/guessImage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
