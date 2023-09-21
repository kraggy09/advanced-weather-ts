import { ReactNode } from "react";

export interface Weather {
  dt: number;
  main: unknown;
  dt_text: string;
  weather: [];
}

export type SearchQuery = {
  lon: number;
  lat: number;
};

export interface BackGround {
  img: string;
  text: "white" | "black";
  portal: "white/30" | "black/10";
}

export interface WeatherProviderProps {
  children: ReactNode;
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  dt_txt: string;
  wind: {
    dust: number;
    gust: number;
    deg: number;
  };
  weather: [{ main: string }];
}
export interface ForeCast {
  list: ForecastItem[];
  sys: {
    sunrise: number;
    sunset: number;
  };
}

export interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: [{ main: string }];
  wind: {
    speed: number;
  };
}
