const mockData = {
  data: [
    {
      id: "0",
      guess: {
        text: "this is a placeholder image",
        src: "https://via.placeholder.com/300",
        score: 0.98,
      },
    },
    {
      id: "1",
      guess: {
        text: "this is another placeholder image 2",
        src: "https://via.placeholder.com/300",
        score: 0.8,
      },
    },
  ],
};

export const getUserGuess = async (url?: string) => {
  const response = url ? await fetch(`/api/guessImage?url=${url}`) : "";
  return response ? response.json() : mockData;
};
