import { setCookie } from "../utils/cookie";
import { BackgroundBeams } from "./BackgroundBeams";

interface LandingProps {
  setHideLanding: (hideLanding: boolean) => void;
}

export const Landing: React.FC<LandingProps> = ({ setHideLanding }) => {
  return (
    <div
      className={`h-[100vh] w-[100vw] flex flex-col gap-4 justify-center items-center bg-black`}
    >
      <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <div className="flex flex-col gap-6 max-w-2xl mx-auto p-4 justify-center items-center">
          <h1 className="relative z-10 text-4xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
            Welcome to PicaSolana
          </h1>
          <p></p>
        </div>
        <button
          className="p-[3px] relative"
          type="button"
          onClick={() => {
            // console.log("clicked");
            setCookie("hasLanding", "true", 1);
            setHideLanding(true);
          }}
        >
          <div className="absolute z-[999] inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div
            className="px-8 py-2 z-[999]  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent"
            onClick={() => {
              console.log("clicked");
              setCookie("hasLanding", "true", 1);
              setHideLanding(true);
            }}
          >
            Play Now
          </div>
        </button>
        <BackgroundBeams />
      </div>
    </div>
  );
};
