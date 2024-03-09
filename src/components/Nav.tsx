import { NavLink } from "react-router-dom";

export const Nav = () => {
  return (
    <nav
      style={{
        display: "flex",
        marginTop: 5,
      }}
    >
      <div style={{ display: "flex", margin: "0 auto" }}>
        <div style={{ padding: "5px 10px" }}>
          <NavLink
            to={`/`}
            className={({ isActive }: any) => (isActive ? "underline" : "")}
          >
            <span>Main</span>
          </NavLink>
        </div>
        <div style={{ padding: "5px 10px" }}>
          <NavLink
            to={`/leaderboard`}
            className={({ isActive }: any) => (isActive ? "underline" : "")}
          >
            <span>Leader Board</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
