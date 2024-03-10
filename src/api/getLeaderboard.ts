const baseURL = "http://localhost:3000";

export interface IUser {
  sessionId: string;
  bestContestEntryIndex: number;
  bestScore: number;
  name: string;
  email?: string;
  solanaAddress?: string;
  telegramHandle?: string;
}

export interface IContestEntry {
  index: number;
  sessionId: string;
  image: string; // base64 encoded image
  prompt: string;
  score: number;
}

export const getLeaderboard = async () => {
  try {
    const response = await fetch(`${baseURL}/api/contest/leaderboard`);
    return (await response.json()) as IUser[];
  } catch (error) {
    return [];
  }
};

export const getImageOfUser = async (sessionId: string, index: number) => {
  try {
    const response = await fetch(
      `${baseURL}/api/contest/submission/${sessionId}/${index}`
    );
    return (await response.json()) as IContestEntry;
  } catch (error) {
    console.log(error);
    return { index, sessionId, image: "", prompt: "", score: 0 };
  }
};
