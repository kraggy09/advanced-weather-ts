import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import useFetch from "../hooks/useFetch";
import { API_KEY } from "../constants";
import {
  BackGround,
  ForeCast,
  WeatherProviderProps,
} from "../interface/interface";

export interface WeatherContextProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  searchQuery: SearchQuery | null;
  setSearchQuery: Dispatch<SetStateAction<SearchQuery | null>>;
  weatherData: unknown;
  foreCast: ForeCast;
  bg: BackGround;
}

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
  const [bg, setBg] = useState<BackGround>({
    img: "main.jpg",
    portal: "black",
    text: "white",
  });

  const lat = searchQuery?.lat;
  const lon = searchQuery?.lon;

  const { data: weatherData } = useFetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  console.log(weatherData);

  useEffect(() => {
    // const date = new Date().getHours();
    if (weatherData) {
      if (weatherData.weather[0].main.localeCompare("haze")) {
        setBg({ img: "haze.jpg", portal: "black", text: "white" });
      } else if (weatherData.weather[0].main.localeCompare("rain")) {
        setBg({ img: "rain.jpg", portal: "white", text: "black" });
      } else if (weatherData.weather[0].main.localeCompare("clouds")) {
        setBg({ img: "rain.jpg", portal: "white", text: "black" });
      }
    }
  }, [weatherData]);

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
    bg: bg,
  };
  console.log(searchQuery);

  return (
    <WeatherContext.Provider value={final}>{children}</WeatherContext.Provider>
  );
};
