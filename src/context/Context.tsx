import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import useFetch from "../hooks/useFetch";
import { API_KEY } from "../constants";

export type WeatherContextProps = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  searchQuery: SearchQuery | null;
  setSearchQuery: Dispatch<SetStateAction<SearchQuery | null>>;
  weatherData: unknown;
};

export type SearchQuery = {
  lon: number;
  lat: number;
};

interface WeatherProviderProps {
  children: ReactNode;
}

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

  const final: WeatherContextProps = {
    query: query,
    setQuery: setQuery,
    searchQuery: searchQuery,
    setSearchQuery: setSearhQuery,
    weatherData: weatherData,
  };
  console.log(searchQuery);

  return (
    <WeatherContext.Provider value={final}>{children}</WeatherContext.Provider>
  );
};
