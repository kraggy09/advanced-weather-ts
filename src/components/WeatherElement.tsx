import React from "react";
import { ForecastItem } from "../interface/interface";
import { days } from "../constants";

interface WeatherElementProps {
  ele: ForecastItem;
  comp: "left" | "right";
}

const WeatherElement: React.FC<WeatherElementProps> = ({ ele, comp }) => {
  // console.log(ele);

  const date = new Date(ele.dt * 1000);
  return (
    <div className="border border-black px-3 lg:px-6 py-1  rounded-xl flex  flex-col items-center justify-center">
      <span>
        {comp == "left"
          ? days[date.getDay()].substring(0, 3)
          : date.getHours() % 12}
        {comp == "right" ? (date.getHours() > 11 ? " PM" : " AM") : ""}
      </span>
      <span className="lg:text-xl">{Math.ceil(ele.main.temp - 273)}°</span>
      <span className="text-gray-800">{ele.weather[0].main}</span>
    </div>
  );
};

export default WeatherElement;
