import { BiSearch } from "react-icons/bi";
import { useState, useContext } from "react";
import { WeatherContext, WeatherContextProps } from "../context/Context";
import useFetch from "../hooks/useFetch";
import { API_KEY } from "../constants";
const Search = () => {
  const [hidden, setHidden] = useState<boolean>(true);
  const { query, setQuery, setSearchQuery, searchQuery } = useContext(
    WeatherContext
  ) as WeatherContextProps;
  const { data, loading, error, setData } = useFetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
  );
  return (
    <div className="w-full h-full flex-col flex items-center justify-center">
      <p className="text-3xl font-light">
        Weather <span className="font-extrabold">Forecast</span>
      </p>
      <p className="px-36 text-center">
        Enter below the location you want to know the weather and select from
        dropdown
      </p>
      <form
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();

          console.log(data, loading, error);
        }}
        className="relative flex mt-6 hover:cursor-pointer"
      >
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative flex justify-center items-center">
            <input
              type="text"
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (query.length == 0) {
                  setData("null");
                }
                setQuery(e.target.value);
              }}
              className={`bg-white/10 h-10 text-white outline-none pl-3 rounded-xl`}
            />

            <button
              className={`absolute right-0`}
              onClick={() => {
                if (hidden) {
                  setHidden(false);
                }
              }}
            >
              <BiSearch size={30} />
            </button>
          </div>
          <div className="bg-white/10  absolute top-11 left-1 pl-6 rounded-xl w-[80%] flex flex-col text-white ">
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
      </form>
    </div>
  );
};

export default Search;
