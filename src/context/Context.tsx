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
  SearchQuery,
  WeatherData,
  WeatherProviderProps,
} from "../interface/interface";

export interface WeatherContextProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  searchQuery: SearchQuery | null;
  setSearchQuery: Dispatch<SetStateAction<SearchQuery | null>>;
  weatherData: WeatherData;
  foreCast: ForeCast;
  bg: BackGround;
}

export const WeatherContext = createContext<WeatherContextProps | undefined>(
  undefined
);

export const WeatherProvider = ({ children }: WeatherProviderProps) => {
  const [query, setQuery] = useState<string>("");
  const [searchQuery, setSearhQuery] = useState<SearchQuery | null>(null);
  const [bg, setBg] = useState<BackGround>({
    img: "main.jpg",
    portal: "white/30",
    text: "black",
  });
  const date = new Date().getHours();

  const lat = searchQuery?.lat;
  const lon = searchQuery?.lon;

  const { data: weatherData } = useFetch<WeatherData>(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  ) as { data: WeatherData };
  console.log(weatherData);

  const { data: foreCast } = useFetch<ForeCast>(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );

  useEffect(() => {
    if (weatherData) {
      if (weatherData.weather[0].main === "Haze") {
        setBg({ img: "haze.jpg", portal: "black/10", text: "white" });
      } else if (weatherData.weather[0].main === "Rain") {
        setBg({ img: "rain.jpg", portal: "white/30", text: "black" });
      } else if (weatherData.weather[0].main === "Clouds") {
        setBg({
          img: "cloudy.jpg",
          portal: "white/30",
          text: "black",
        });
      } else if (weatherData.weather[0].main === "Thunderstorm") {
        setBg({ img: "thunder.jpg", portal: "white/30", text: "black" });
      } else if (weatherData.weather[0].main === "Clear") {
        date > 16
          ? setBg({ img: "clear_night.jpg", portal: "white/30", text: "black" })
          : setBg({ img: "clear.jpg", portal: "white/30", text: "black" });
      } else if (weatherData.weather[0].main === "Drizzle") {
        setBg({ img: "drizzle.jpg", portal: "white/30", text: "black" });
      }
    }
  }, [weatherData]);

  const final: WeatherContextProps = {
    query: query,
    setQuery: setQuery,
    searchQuery: searchQuery,
    setSearchQuery: setSearhQuery,
    weatherData: weatherData as WeatherData,
    foreCast: foreCast as ForeCast,
    bg: bg,
  };
  console.log(searchQuery);

  return (
    <WeatherContext.Provider value={final}>{children}</WeatherContext.Provider>
  );
};
