import React from "react";
import { Weather } from "../interface/interface";

interface WeatherElementProps {
  ele: Weather;
}

const WeatherElement: React.FC<WeatherElementProps> = ({ ele }) => {
  return (
    <div className="border border-black px-6 py-3  rounded-xl flex flex-col items-center justify-center">
      <span>{ele.day}</span>
      <span className="text-2xl">{ele.weather}°</span>
      <span className="text-gray-800">{ele.atmosphere}</span>
    </div>
  );
};

export default WeatherElement;
