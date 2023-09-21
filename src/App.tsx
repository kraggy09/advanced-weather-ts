import { useContext } from "react";
import Home from "./components/Home";
import { WeatherContext } from "./context/Context";

const App = () => {
  const { bg } = useContext(WeatherContext);
  return (
    <div
      className={`w-full bg-[url('/main.jpg')] bg-cover font-nunito font-bold h-[100vh] font-poppins flex items-center justify-center`}
    >
      <Home />
    </div>
  );
};

export default App;
