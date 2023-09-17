import Home from "./components/Home";

const App = () => {
  return (
    //
    <div
      className={`w-full bg-[url('/rain.jpg')] font-nunito font-bold h-[100vh] font-poppins flex items-center justify-center`}
    >
      <div className="absolute inset-0">
        <video autoPlay muted loop className="w-full h-full object-cover">
          <source src="/rain.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <Home />
    </div>
  );
};

export default App;
