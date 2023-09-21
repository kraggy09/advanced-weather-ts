import React from "react";
import { ForecastItem } from "../interface/interface";

interface WeatherElementProps {
  ele: ForecastItem;
}

const WeatherElement: React.FC<WeatherElementProps> = ({ ele }) => {
  console.log(ele);

  const date = new Date(ele.dt * 1000);
  return (
    <div className="border border-black px-6 py-1  rounded-xl flex flex-col items-center justify-center">
      <span>{date.getHours()}</span>
      <span className="text-xl">{Math.ceil(ele.main.temp - 273)}°</span>
      <span className="text-gray-800">{ele.weather[0].main}</span>
    </div>
  );
};

export default WeatherElement;
