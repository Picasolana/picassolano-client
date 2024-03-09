import { Title } from "./components/Title";
import { getImage, image_url } from "./api/getImage";
import { GivenImage } from "./components/GivenImage";
import { getUserGuess } from "./api/getUserGuess";
import { GuessImage } from "./components/GuessImage";
import { useEffect, useState } from "react";
import { Nav } from "./components/Nav";
import { Logo } from "./components/Logo";
import { Landing } from "./components/Landing";
import { getCookie } from "./utils/cookie";

export default function Home() {
  const [imageUrl, setImageUrl] = useState("");
  const [userGuess, setUserGuess] = useState([]);
  const [hideLanding, setHideLanding] = useState(false);
  const [hasLandingCookie, setHasLandingCookie] = useState(false);

  useEffect(() => {
    const hasLanding = getCookie("hasLanding");
    if (hasLanding) {
      setHasLandingCookie(true);
      setHideLanding(true);
    }
  }, [hasLandingCookie]);

  useEffect(() => {
    const fetchImage = async () => {
      const image = await getImage(image_url);
      setImageUrl(image);
    };
    fetchImage();
  }, []);

  useEffect(() => {
    const fetchUserGuess = async () => {
      const userGuessData = await getUserGuess();
      setUserGuess(userGuessData.data);
    };
    fetchUserGuess();
  }, []);

  const emptyGuess = {
    id: userGuess?.length?.toString(),
    guess: { text: "", src: "https://via.placeholder.com/300", score: 0 },
  };

  if (!hasLandingCookie && !hideLanding) {
    return <Landing setHideLanding={setHideLanding} />;
  } else {
    return (
      <main className="flex min-h-screen flex-col items-center p-8 gap-8">
        <Logo />
        <Nav />
        <Title text="Replicate the image using AI" />
        <div className="flex flex-col items-center md:items-start md:flex-row gap-16">
          <GivenImage
            src={imageUrl}
            alt={"stock image"}
            description="Guess my prompt"
          />
          <GuessImage userGuess={[...userGuess, emptyGuess]} />
        </div>
      </main>
    );
  }
}
