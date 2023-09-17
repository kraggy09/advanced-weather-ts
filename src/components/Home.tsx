import Left from "./Left";
import Right from "./Right";

const Home = () => {
  return (
    <>
      <div className="w-[80vw] flex rounded-xl backdrop-blur-lg text-black  bg-white/30	 h-[80vh]">
        <Left />
        <Right />
      </div>
    </>
  );
};

export default Home;
