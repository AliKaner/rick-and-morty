import { fetchCharacter } from "@/api";
import RootLayout from "@/app/_app";
import { Card } from "@/components/Card";
import HomeButton from "@/components/HomeButton";
import { Title } from "@/components/Title";
import { CharacterType, Status } from "@/shared/types";
import { extractIdFromUrl } from "@/shared/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function CharacterPage() {
  const [currentCharacter, setCurrentCharacter] = useState<
    CharacterType
  >();
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    getCharacter();
  }, [slug]);

  const getStatusStyle = (status: Status) => {
    const statusStyles: { [key in Status]: string } = {
      [Status.Dead]: "bg-red-400",
      [Status.Alive]: "bg-green-400",
      [Status.Unknown]: "bg-purple-400",
    };
    return statusStyles[status] || "";
  };

  const getCharacter = async () => {
    try {
      const response = await fetchCharacter(parseInt(slug as string));
      setCurrentCharacter(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onLocationClickHandle = () => {
    if (currentCharacter && currentCharacter.location?.name !== "unknown") {
      router.push(`/location/${extractIdFromUrl(currentCharacter.location.url)}`);
    }
  }
  
  const onEpisodeClickHandle = () => {
    if (currentCharacter && currentCharacter.origin?.name !== "unknown") {
      router.push(`/episode/${extractIdFromUrl(currentCharacter.origin.url)}`);
    }
  }
  
  

  return (
    <RootLayout>
      <HomeButton />
      <div className="flex flex-col items-center gap-4 justify-center bg-secondary h-screen text-white">
        <div className="font-extrabold text-5xl">{currentCharacter?.name}</div>
        <img
          src={currentCharacter?.image}
          alt={currentCharacter?.name}
          className="w-64 h-64 rounded-full"
        />

        <div className="flex flex-row items-center ">
          <div
            className={`rounded-full w-2 h-2 mr-2 ${getStatusStyle(
              currentCharacter?.status
                ? currentCharacter?.status
                : Status.Unknown
            )}`}
          />
          <>
            {currentCharacter?.status} - {currentCharacter?.species}
          </>
        </div>
        <div
          onClick={onLocationClickHandle}
          className="text-left hover:text-green-600"
        >
          <div className="mb-2">
            Last known location: {currentCharacter?.location.name}
          </div>
        </div>
        <div
          onClick={onEpisodeClickHandle}
          className="text-left hover:text-green-600"
        >
          <div className="mb-2">
            First seen in: {currentCharacter?.origin.name}
          </div>
        </div>
      </div>
    </RootLayout>
  );
}

export default CharacterPage;
