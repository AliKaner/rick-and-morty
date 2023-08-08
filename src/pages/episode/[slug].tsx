import { fetchCharacterGroup, fetchEpisode } from "@/api";
import RootLayout from "@/app/_app";
import { Card } from "@/components/Card";
import { CardContainer } from "@/components/CardContainer";
import HomeButton from "@/components/HomeButton";
import { Title } from "@/components/Title";
import { CharacterType, EpisodeResponse } from "@/shared/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function EpisodePage() {
  const [currentEpisode, setCurrentEpisode] = useState<
    EpisodeResponse | undefined
  >();
  const [currentCharacters, setCurrentCharacters] = useState<CharacterType[]>(
    []
  );
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      getEpisode();
    }
  }, [slug]);

  const getEpisode = async () => {
    try {
      const response = await fetchEpisode(parseInt(slug as string));
      setCurrentEpisode(response);

      if (response?.characters) {
        getCharacters(response.characters);
      }
    } catch (error) {
      console.error("Error fetching episode data:", error);
    }
  };

  const getCharacters = async (characterUrls: string[]) => {
    try {
      const characters = await fetchCharacterGroup(characterUrls);
      setCurrentCharacters(characters);
    } catch (error) {
      console.error("Error fetching character data:", error);
    }
  };

  return (
    <RootLayout>
      <HomeButton />
      <Title title={currentEpisode?.name} />
      <div className="bg-secondary text-white text-center ">
        <p>{currentEpisode?.episode}</p>
        <p>{currentEpisode?.air_date}</p>
      </div>
      <div>
        <p className="text-center bg-secondary text-white font-bold text-xl p-4">Characters</p>
        <CardContainer cards={currentCharacters} />
      </div>
    </RootLayout>
  );
}

export default EpisodePage;
