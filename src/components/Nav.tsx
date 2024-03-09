import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <nav
      style={{
        display: "flex",
        marginTop: 50,
      }}
    >
      <div style={{ display: "flex", margin: "0 auto" }}>
        <div style={{ padding: "5px 10px" }}>
          <Link to={`/`}>Main</Link>
        </div>
        <div style={{ padding: "5px 10px" }}>
          <Link to={`/leaderboard`}>Leader Board</Link>
        </div>
      </div>
    </nav>
  );
};
