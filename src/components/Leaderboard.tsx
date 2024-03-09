import React from "react";
import { Nav } from "./Nav";
import { Logo } from "./Logo";

const leaderboardData = [
  {
    rank: 1,
    name: "John Doe",
    score: 100,
    prompt:
      "Paint a scene where a young girl dances with fire by the tranquil lakeshore.",
  },
  {
    rank: 2,
    name: "Jane Smith",
    score: 90,
    prompt:
      "Craft a vivid picture of a girl mesmerized by the flames as she stands near the serene lake.",
  },
  {
    rank: 3,
    name: "Alice Johnson",
    score: 85,
    prompt:
      "Describe the captivating sight of a girl twirling flames by the calm waters of the lake.",
  },
  {
    rank: 4,
    name: "Bob Brown",
    score: 80,
    prompt:
      "Illustrate the image of a girl's silhouette against the fiery glow, her laughter echoing across the quiet lake.",
  },
  {
    rank: 5,
    name: "Emma Davis",
    score: 75,
    prompt:
      "Imagine a girl's dance with fire casting enchanting reflections on the placid surface of the lake.",
  },
];

export const Leaderboard = () => {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 gap-8">
      <Logo />
      <Nav />
      <div className="container mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-5 text-center">Leaderboard</h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prompt
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaderboardData.map((player) => (
              <tr key={player.rank}>
                <td className="px-6 py-4 whitespace-nowrap">{player.rank}</td>
                <td className="px-6 py-4 whitespace-nowrap">{player.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{player.prompt}</td>
                <td className="px-6 py-4 whitespace-nowrap">{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};
