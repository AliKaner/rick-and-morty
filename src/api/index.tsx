import { API } from "@/shared/constants";

import {
  CharacterResponse,
  CharacterType,
  EpisodeResponse,
  LocationResponse,
} from "@/shared/types";
import axios, { AxiosResponse } from "axios";

export const fetchCharacters = async (
  page: number
): Promise<CharacterResponse> => {
  const response = await axios.get<CharacterResponse>(
    `${API}/character/?page=${page}`
  );
  return response.data;
};

export const fetchLocation = async (id: number): Promise<LocationResponse> => {
  const response = await axios.get<LocationResponse>(`${API}/location/${id}`);
  return response.data;
};

export const fetchEpisode = async (id: number): Promise<EpisodeResponse> => {
  const response = await axios.get<EpisodeResponse>(`${API}/episode/${id}`);
  return response.data;
};

export const fetchCharacter = async (id: number): Promise<CharacterType> => {
  const response = await axios.get<CharacterType>(`${API}/character/${id}`);
  return response.data;
};

export const fetchCharacterGroup = async (
  characters: string[]
): Promise<CharacterType[]> => {
  const characterPromises: Promise<AxiosResponse<CharacterType>>[] =
    characters.map((url) => axios.get<CharacterType>(url));

  try {
    const characterResponses = await Promise.all(characterPromises);
    const characterData: CharacterType[] = characterResponses.map(
      (response: AxiosResponse<CharacterType>) => response.data
    );
    return characterData;
  } catch (error) {
    console.error("Failed to fetch character group data:", error);
    throw new Error("Failed to fetch character group data.");
  }
};
