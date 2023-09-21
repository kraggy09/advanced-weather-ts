import { BsDroplet } from "react-icons/bs";
import { LiaWindSolid } from "react-icons/lia";
import { BiSearch } from "react-icons/bi";

import WeatherElement from "./WeatherElement";
import { ForecastItem } from "../interface/interface";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { WeatherContext, WeatherContextProps } from "../context/Context";
import useFetch from "../hooks/useFetch";
import { API_KEY } from "../constants";

const Left = () => {
  const { query, setQuery, setSearchQuery, weatherData, foreCast } = useContext(
    WeatherContext
  ) as WeatherContextProps;
  // console.log(foreCast);

  var currDate = new Date().getDate();
  const flag = true;
  const { data, setData } = useFetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
  );

  const date = new Date();

  const [hidden, setHidden] = useState<boolean>(true);

  return (
    <div className="lg:w-3/4 w-full p-5 text-lg h-full ">
      <div className="flex relative lg:text-xl justify-between items-center">
        <span className="">
          {weatherData?.name}, {"  "}
          {weatherData?.sys.country}
        </span>
        <span className="">
          {date.getDate()}.
          {date.getMonth() > 10 ? date.getMonth() : "0" + date.getMonth()}.
          {date.getFullYear()}
        </span>
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();

            // console.log(data, loading, error);
          }}
          className="relative hidden lg:visible h-full lg:flex  hover:cursor-pointer"
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
                  data.map((ele, index) => {
                    return (
                      <span
                        key={index}
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

        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
          }}
          className="lg:hidden visible"
        >
          <div className="lg:hidden visible">
            {" "}
            {!hidden && (
              <div className="absolute right-16">
                <input
                  type="text"
                  value={query}
                  placeholder="Search Here"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (query.length == 0) {
                      setData("null");
                    }
                    setQuery(e.target.value);
                  }}
                  className={`bg-black text-white outline-none pl-3 rounded-xl`}
                />
                <div className="bg-black  absolute top-8 left-1 pl-6 rounded-xl w-[80%] flex flex-col text-white ">
                  {Array.isArray(data) &&
                    data.map((ele, i) => {
                      return (
                        <span
                          key={i}
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
                !hidden && "lg:border-l-2"
              } right-0`}
              onClick={() => {
                setHidden(!hidden);
              }}
            >
              <BiSearch size={30} />
            </button>
          </div>
        </form>
      </div>
      <div className="flex pt-6 items-center justify-center">
        <span className="flex items-center justify-center flex-col">
          <p className="xl:text-8xl 2xl:text-10xl md:text-6xl text-5xl">
            {Math.ceil(weatherData?.main?.temp - 273)}°
          </p>
          <p className="lg:text-3xl">{weatherData?.weather[0].main}</p>
        </span>
        <div className="text-xl pl-5">
          <span
            className="flex items-center justify-between
          "
          >
            <LiaWindSolid size={30} />{" "}
            <p className="px-3">{weatherData?.wind?.speed}km/h</p>
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
      <div className="md:grid-cols-6 grid grid-cols-3 gap-6 px-6 lg:px-0 md:px-6 w-full pt-8 xl:items-center md:gap-6 xl:gap-10 xl:px-16 2xl:px-32">
        {foreCast &&
          foreCast.list.map((ele: ForecastItem, index: number) => {
            const date = new Date(ele.dt * 1000).getDate();

            if (flag && currDate < date) {
              currDate += 1;
            }

            if (date == currDate) {
              currDate = currDate + 1;
              return <WeatherElement key={index} comp={"left"} ele={ele} />;
            }
          })}
      </div>
    </div>
  );
};

export default Left;
