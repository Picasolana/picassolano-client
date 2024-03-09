import React from "react";
import { Nav } from "./Nav";
import { Logo } from "./Logo";

export const Leaderboard = () => {
  return (
    <main style={{ width: "100vw", height: "100vh" }}>
      <Logo />
      <Nav />
      <div style={{ display: "flex", justifyContent: "center" }}>
        Leaderboard
      </div>
    </main>
  );
};
