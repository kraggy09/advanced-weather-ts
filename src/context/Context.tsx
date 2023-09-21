import { Dispatch, SetStateAction, createContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import { API_KEY } from "../constants";
import { ForeCast, WeatherProviderProps } from "../interface/interface";

export type WeatherContextProps = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;

  searchQuery: SearchQuery | null;
  setSearchQuery: Dispatch<SetStateAction<SearchQuery | null>>;
  weatherData: unknown;
  foreCast: ForeCast;
};

export type SearchQuery = {
  lon: number;
  lat: number;
};

export const WeatherContext = createContext<WeatherContextProps | undefined>(
  undefined
);

export const WeatherProvider = ({ children }: WeatherProviderProps) => {
  const [query, setQuery] = useState<string>("");
  const [searchQuery, setSearhQuery] = useState<SearchQuery | null>(null);

  const lat = searchQuery?.lat;
  const lon = searchQuery?.lon;

  const { data: weatherData } = useFetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  console.log(weatherData);

  const { data: foreCast } = useFetch<ForeCast>(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );

  const final: WeatherContextProps = {
    query: query,
    setQuery: setQuery,
    searchQuery: searchQuery,
    setSearchQuery: setSearhQuery,
    weatherData: weatherData,
    foreCast: foreCast as ForeCast,
  };
  console.log(searchQuery);

  return (
    <WeatherContext.Provider value={final}>{children}</WeatherContext.Provider>
  );
};
