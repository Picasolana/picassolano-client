import { Title } from "./components/Title";
import { getImage, image_url } from "./api/getImage";
import { GivenImage } from "./components/GivenImage";
import { getUserGuess } from "./api/getUserGuess";
import { GuessImage } from "./components/GuessImage";
import { useEffect, useState } from "react";
import React from "react";
import { Nav } from "./components/Nav";

export default function Home() {
  const [imageUrl, setImageUrl] = useState("");
  const [userGuess, setUserGuess] = useState([]);

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
  return (
    <main className="flex min-h-screen flex-col items-center p-8 gap-8">
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
