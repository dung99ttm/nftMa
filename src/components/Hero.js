import "../styles/Hero.css";
import {useNavigate} from "react-router-dom";
import Header from "./Header";

const Hero = ({list}) => {
  let navigate = useNavigate();

  const goExplore = () => {
    navigate("/explore");
  };

  const goCreate = () => {
    navigate("/create");
  };

  return (
    <div id="hero">
      <Header />
      <h1 id="header-text-first"> NFT </h1>
      <h1 id="header-text-second">Marketplace</h1>
      <h5 id="header-subtext">Craft, hunt and trade NFT's</h5>
      <div id="hero-buttons">
        <button id="explore" onClick={goExplore}>
          Explore
        </button>
        <button id="create" onClick={goCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Hero;
