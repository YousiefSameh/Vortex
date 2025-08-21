import HeroTitle from "../assets/HeroTitle.png";
import ParticlesFile from "@/components/particles/particles";

const HomePage = () => {
  return (
    <div className="home-page  w-full h-screen flex justify-center items-center ">
      <ParticlesFile />
      <img src={HeroTitle} alt="Hero Title" className="z-50 w-[650px] " />
    </div>
  );
};

export default HomePage;
