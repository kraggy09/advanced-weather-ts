import { BsDroplet } from "react-icons/bs";
import { LiaWindSolid } from "react-icons/lia";
import { BiSearch } from "react-icons/bi";

import WeatherElement from "./WeatherElement";
import { Weather } from "../interface/interface";
import { useState } from "react";
const Left = () => {
  const date = new Date();

  const arr: Weather[] = [
    { day: "Mon", weather: 20, atmosphere: "Mist" },
    { day: "Tue", weather: 10, atmosphere: "Rainy" },
    { day: "Wed", weather: 15, atmosphere: "Mist" },
    { day: "Thu", weather: 16, atmosphere: "Sunny" },
    { day: "Fri", weather: 23, atmosphere: "Mist" },
    { day: "Sat", weather: 23, atmosphere: "Mist" },
  ];
  const [hidden, setHidden] = useState<boolean>(true);

  return (
    <div className="w-3/4 p-5 text-lg h-full ">
      <div className="flex text-xl justify-between items-center">
        <span>Mumbai</span>
        <span className="">
          {date.getDate()}.
          {date.getMonth() > 10 ? date.getMonth() : "0" + date.getMonth()}.
          {date.getFullYear()}
        </span>
        <span className="relative h-full flex  hover:cursor-pointer">
          {!hidden && (
            <input
              type="text"
              className={`bg-white/10 text-white outline-none pl-3 rounded-xl`}
            />
          )}
          <span
            className={`${!hidden && "absolute"}  ${
              !hidden && "border-l-2"
            } right-0`}
            onClick={() => {
              if (hidden) {
                setHidden(false);
              }
            }}
          >
            <BiSearch size={30} />
          </span>
        </span>
      </div>
      <div className="flex pt-6 items-center justify-center">
        <span className="flex items-center justify-center flex-col">
          <p className="text-10xl">20°</p>
          <p className="text-3xl">Cloudy</p>
        </span>
        <div className="text-xl pl-5">
          <span
            className="flex items-center justify-between
          "
          >
            <LiaWindSolid size={30} /> <p className="px-3">6.1mph</p>
          </span>
          <span
            className="flex items-center justify-between
          "
          >
            <BsDroplet size={30} /> <p className="px-3">90%</p>
          </span>
        </div>
      </div>
      <div className="flex w-full pt-8 items-center gap-10 px-32">
        {arr.map((ele: Weather, index: number) => {
          return <WeatherElement key={index} ele={ele} />;
        })}
      </div>
    </div>
  );
};

export default Left;
