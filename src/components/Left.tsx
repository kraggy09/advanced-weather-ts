import { BsDroplet } from "react-icons/bs";
import { LiaWindSolid } from "react-icons/lia";
import { BiSearch } from "react-icons/bi";

import WeatherElement from "./WeatherElement";
import { Weather } from "../interface/interface";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { WeatherContext, WeatherContextProps } from "../context/Context";
import useFetch from "../hooks/useFetch";
import { API_KEY } from "../constants";
const Left = () => {
  const { query, setQuery, setSearchQuery, searchQuery, weatherData } =
    useContext(WeatherContext) as WeatherContextProps;
  const { data, loading, error, setData } = useFetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
  );
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
        <span>
          {searchQuery?.name}, {"  "}
          {searchQuery?.country}
        </span>
        <span className="">
          {date.getDate()}.
          {date.getMonth() > 10 ? date.getMonth() : "0" + date.getMonth()}.
          {date.getFullYear()}
        </span>
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();

            console.log(data, loading, error);
          }}
          className="relative h-full flex  hover:cursor-pointer"
        >
          {!hidden && (
            <div>
              <input
                type="text"
                value={query}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (query.length == 0) {
                    setData("null");
                  }
                  setQuery(e.target.value);
                }}
                className={`bg-white/10 text-white outline-none pl-3 rounded-xl`}
              />
              <div className="bg-white/10  absolute top-8 left-1 pl-6 rounded-xl w-[80%] flex flex-col text-white ">
                {Array.isArray(data) &&
                  data.map((ele) => {
                    return (
                      <span
                        onClick={() => {
                          setHidden(true);
                          setQuery("");
                          setData("null");
                          setSearchQuery(ele);
                        }}
                      >
                        {ele.name}, {"   "}
                        {ele.country}
                      </span>
                    );
                  })}
              </div>
            </div>
          )}
          <button
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
          </button>
        </form>
      </div>
      <div className="flex pt-6 items-center justify-center">
        <span className="flex items-center justify-center flex-col">
          <p className="text-10xl">
            {Math.ceil(weatherData?.main?.temp - 273)}°
          </p>
          <p className="text-3xl">{weatherData?.weather[0]?.main}</p>
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
            <BsDroplet size={30} />{" "}
            <p className="px-3">{weatherData?.main?.humidity}%</p>
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
