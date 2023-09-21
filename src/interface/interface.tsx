import { ReactNode } from "react";

export interface Weather {
  dt: number;
  main: unknown;
  dt_text: string;
  weather: [];
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
}
