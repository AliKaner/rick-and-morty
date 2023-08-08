export type CharacterType = {
  id: number;
  name: string;
  status: Status;
  species: string;
  type: string;
  origin: LocationType;
  location: LocationType;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export enum Status {
  Dead = "Dead",
  Alive = "Alive",
  Unknown = "unknown",
}

export type LocationType = {
  name: string;
  url: string;
};

export interface CharacterResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: CharacterType[];
}

export type EpisodeResponse = {
    id:number;
    name:string;
    air_date:string,
    episode:string,
    characters: string[];
    url:string;
    created:string;
}

export type LocationResponse = {
    id:number;
    name:string;
    type:string;
    dimension:string;
    residents:string[];
    url:string;
    created:string;
}