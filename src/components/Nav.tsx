import { NavLink } from "react-router-dom";
import { Logo } from "./Logo";
import { Title } from "./Title";

export const Nav = () => {
  return (
    <nav className="flex h-24 w-full justify-center border-b border-border px-2.5 xl:px-0">
      <div className="flex h-full w-full max-w-[1320px] items-center justify-between">
        <div className="flex gap-4">
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
              <span>Leaderboard</span>
            </NavLink>
          </div>
        </div>
        <Title text="Replicate the image using AI" />
        <Logo />
      </div>
    </nav>
  );
};
