import React from "react";
import { Nav } from "./Nav";
import { Logo } from "./Logo";

export const Leaderboard = () => {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 gap-8">
      <Logo />
      <Nav />
      <div style={{ display: "flex", justifyContent: "center" }}>
        Leaderboard
      </div>
    </main>
  );
};
