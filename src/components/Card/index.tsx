import { CharacterType, Status } from "@/shared/types";
import { extractIdFromUrl } from "@/shared/utils";
import { useRouter } from "next/router";

export function Card({ cardProps }: { cardProps: CharacterType }) {
  const router = useRouter();

  const getStatusStyle = (status: Status) => {
    const statusStyles: { [key in Status]: string } = {
      [Status.Dead]: "bg-red-400",
      [Status.Alive]: "bg-green-400",
      [Status.Unknown]: "bg-purple-400",
    };
    return statusStyles[status] || "";
  };

  const onCardClickHandle = () => {
    router.push(`/character/${cardProps.id}`);
  };

  const onLocationClickHandle = () => {
    if (cardProps.location.name === "unknown") {
      return;
    }
    router.push(`/location/${extractIdFromUrl(cardProps.location.url)}`);
  };

  const onEpisodeClickHandle = () => {
    if (cardProps.origin.name === "unknown") {
      return;
    }
    router.push(`/episode/${extractIdFromUrl(cardProps.origin.url)}`);
  };

  return (
    <div className="flex flex-col md:flex-row bg-primary text-white rounded-xl h-144 w-full xs:w-144 items-center justify-center gap-4">
      <img
        className="w-full md:w-1/3 rounded-t-lg xs:rounded-l-lg"
        src={cardProps.image}
      />
      <div className="md:w-2/3 md:ml-4 flex flex-col gap-4 justify-around text-left">
        <div className="text-left flex  flex-col ">
          <h1
            onClick={onCardClickHandle}
            className="cursor-pointer hover:text-green-300 text-2xl font-extrabold"
          >
            {cardProps.name}
          </h1>
          <div className="flex flex-row items-center">
            <div
              className={`rounded-full w-2 h-2 mr-1 flex-none ${getStatusStyle(
                cardProps.status
              )}`}
            />
            <>
              {cardProps.status} - {cardProps.species}
            </>
          </div>
        </div>
        <div
          className="cursor-pointer hover:text-green-700"
          onClick={onLocationClickHandle}
        >
          <div>Last known location:</div>
          <div>{cardProps.location.name}</div>
        </div>
        <div
          className="cursor-pointer hover:text-green-500"
          onClick={onEpisodeClickHandle}
        >
          <div>First seen in:</div>
          <div>{cardProps.origin.name}</div>
        </div>
      </div>
    </div>
  );
}
