import { useContext, useEffect, useState } from "react";
import Left from "./Left";
import Right from "./Right";
import { WeatherContext, WeatherContextProps } from "../context/Context";
import Search from "./Search";

interface Geolocation {
  lat: number;
  long: number;
}

const Home = () => {
  const { bg } = useContext(WeatherContext) as WeatherContextProps;
  const [geo, setGeo] = useState<Geolocation | undefined>(undefined);
  const { searchQuery, setSearchQuery } = useContext(
    WeatherContext
  ) as WeatherContextProps;
  useEffect(() => {
    function fetchLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setGeo({ long: longitude, lat: latitude });
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }

    fetchLocation();
  }, []);

  useEffect(() => {
    geo && setSearchQuery({ lat: geo?.lat, lon: geo?.long });
  }, [geo]);
  return (
    <>
      <>
        {searchQuery ? (
          <div
            className={`w-[80vw] flex rounded-xl backdrop-blur-lg text-$black  bg-white/30	 h-[80vh]`}
          >
            <Left />
            <Right />
          </div>
        ) : (
          <div className="w-[40vw] bg-white/30 text-black backdrop-blur-lg rounded-xl h-[60vh]">
            <Search />
          </div>
        )}
      </>
    </>
  );
};

export default Home;
