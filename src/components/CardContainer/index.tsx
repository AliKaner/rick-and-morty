import { CharacterType } from "@/shared/types";
import { Card } from "../Card";

export function CardContainer({ cards }: { cards: CharacterType[] }) {
  return (
    <div className="min-h-screen w-screen flex flex-wrap flex-shrink-0 gap-6 bg-secondary p-4 items-center justify-center">
      {cards.map((card) => (
        <Card key={card.id} cardProps={card}/>
      ))}
    </div>
  );
}
