import { fetchCharacterGroup, fetchLocation } from "@/api";
import RootLayout from "@/app/_app";
import { Card } from "@/components/Card";
import { CardContainer } from "@/components/CardContainer";
import HomeButton from "@/components/HomeButton";
import { Title } from "@/components/Title";
import { CharacterType, LocationResponse } from "@/shared/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// ... (imports)

function LocationPage() {
  const [currentLocation, setCurrentLocation] =
    useState<LocationResponse | null>(null);
  const [currentCharacters, setCurrentCharacters] = useState<CharacterType[]>(
    []
  );
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      getLocation();
    }
  }, [slug]);

  const getLocation = async () => {
    try {
      const response = await fetchLocation(parseInt(slug as string));
      setCurrentLocation(response);

      if (response?.residents) {
        getCharacters(response.residents);
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  const getCharacters = async (residentUrls: string[]) => {
    try {
      const characters = await fetchCharacterGroup(residentUrls);
      setCurrentCharacters(characters);
    } catch (error) {
      console.error("Error fetching character data:", error);
    }
  };

  return (
    <RootLayout>
        <HomeButton />
      {currentLocation && (
        <div className="text-white bg-secondary">
          <Title title={currentLocation.name ?? "Location Name"} />
          <div className="text-center text-2xl p-8">
            <p>{currentLocation.dimension ?? "Dimension"} {currentLocation.type ?? "Location Type"}</p>
          </div>
          <div>
            <p className="text-center font-bold">Characters</p>
            <CardContainer cards={currentCharacters}/>
          </div>
        </div>
      )}
    </RootLayout>
  );
}

export default LocationPage;
