import { BsDroplet } from "react-icons/bs";
import { LiaWindSolid } from "react-icons/lia";

import { Weather } from "../interface/interface";
import WeatherElement from "./WeatherElement";

const Right = () => {
  const date = new Date();
  const arr: Weather[] = [
    { day: "1PM", weather: 20, atmosphere: "Mist" },
    { day: "2PM", weather: 10, atmosphere: "Rainy" },
    { day: "3PM", weather: 15, atmosphere: "Mist" },
    { day: "4PM", weather: 16, atmosphere: "Sunny" },
    { day: "5PM", weather: 23, atmosphere: "Mist" },
    { day: "6PM", weather: 23, atmosphere: "Mist" },
  ];
  return (
    <div className="w-1/4 p-5 text-lg bg-white/10">
      <span className="text-2xl">
        <h1 className="text-center">
          {date.getHours() > 16
            ? "Good Evening"
            : date.getHours() > 12
            ? "Good AfterNoon"
            : "Good Morning"}
        </h1>
        <h3 className="text-center pt-8">12:27 PM</h3>
      </span>
      <div className="flex pt-6 flex-col items-center justify-center">
        <span className="flex items-center justify-center ">
          <p className="text-5xl">20°</p>
          <div className="text-sm font-bold pl-5">
            <span className="flex items-center justify-center">
              <LiaWindSolid size={20} /> <p className="px-3">6.1mph</p>
            </span>
            <span className="flex items-center justify-center">
              <BsDroplet size={20} /> <p className="px-3">90%</p>
            </span>
          </div>
        </span>
        <p className="pt-1">Feels Like 19</p>
        <p className="pt-1">Cloudy</p>
      </div>
      <div className="flex pt-16 items-center justify-center flex-col">
        <h1 className="text-2xl py-3">Hourly ForeCast</h1>
        <div className="flex flex-wrap gap-3 items-center justify-center w-full">
          {arr.map((ele: Weather, index: number) => {
            return <WeatherElement ele={ele} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Right;
