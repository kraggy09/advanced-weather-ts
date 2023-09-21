import { BsDroplet } from "react-icons/bs";
import { LiaWindSolid } from "react-icons/lia";

import { ForecastItem } from "../interface/interface";
import WeatherElement from "./WeatherElement";
import { useContext } from "react";
import { WeatherContext, WeatherContextProps } from "../context/Context";

const Right = () => {
  const { weatherData, foreCast } = useContext(
    WeatherContext
  ) as WeatherContextProps;
  const date = new Date();

  return (
    <div className="lg:w-1/4 p-5 text-lg bg-white/10">
      <span className="hidden md:block xl:text-2xl text-xl">
        <h1 className="text-center">
          {date.getHours() > 16
            ? "Good Evening"
            : date.getHours() > 12
            ? "Good AfterNoon"
            : "Good Morning"}
        </h1>
        <h3 className="text-center pt-3">
          {"  "}
          {date.getHours() > 12 ? date.getHours() % 12 : date.getHours()}:
          {date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}{" "}
          {date.getHours() > 12 ? "PM" : "AM"}
        </h3>
      </span>
      <div className="xl:flex pt-1 xl:visible hidden flex-col items-center justify-center">
        <span className="flex items-center justify-center ">
          <p className="text-5xl">
            {weatherData ? Math.ceil(weatherData?.main?.temp - 273) : ""}°
          </p>
          <div className="text-sm font-bold pl-5">
            <span className="flex items-center justify-center">
              <LiaWindSolid size={20} />{" "}
              <p className="px-3">{weatherData?.wind?.speed}km/h</p>
            </span>
            <span className="flex items-center justify-center">
              <BsDroplet size={20} />{" "}
              <p className="px-3">
                {weatherData && weatherData?.main?.humidity}%
              </p>
            </span>
          </div>
        </span>
        <p className="pt-1">
          Feels Like {Math.ceil(weatherData?.main?.feels_like - 273)}°
        </p>
        <p className="pt-1">{weatherData && weatherData.weather[0].main}</p>
      </div>
      <div className="flex pt-3 items-center justify-center flex-col">
        <h1 className="xl:text-2xl md:text-xl pt-1">Hourly ForeCast</h1>
        <div className="flex flex-wrap gap-3 items-center justify-center w-full">
          {foreCast &&
            foreCast.list.map((ele: ForecastItem, index: number) => {
              if (index <= 5) {
                return <WeatherElement ele={ele} comp="right" key={index} />;
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default Right;
