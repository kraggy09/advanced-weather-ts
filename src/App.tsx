import { useContext } from "react";
import Home from "./components/Home";
import { WeatherContext, WeatherContextProps } from "./context/Context";

const App = () => {
  const { bg } = useContext(WeatherContext) as WeatherContextProps;
  return (
    <div
      className={`w-full font-nunito font-bold h-[100vh] font-poppins flex items-center justify-center`}
    >
      <img
        className="absolute h-[100vh] w-[100vw] object-cover"
        src={`/${bg.img}`}
      />
      <Home />
    </div>
  );
};

export default App;
