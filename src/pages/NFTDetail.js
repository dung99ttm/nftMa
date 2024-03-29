import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import {useLocation} from "react-router";
import Card from "../components/base/Card";
import "../styles/NFTDetail.css";
import {ColorExtractor} from "react-color-extractor";
import Button from "../components/base/Button";
import {FaEthereum} from "react-icons/fa";
import {AiOutlineHeart, AiFillHeart} from "react-icons/ai";
import {useMobile} from "../hooks/isMobile";

const NFTDetail = () => {
  const isMobile = useMobile();
  const [colors, setColors] = useState([]);
  const [isLike, setIsLike] = useState(false);

  const like = () => setIsLike(!isLike);
  const getColors = (colors) => {
    setColors((c) => [...c, ...colors]);
  };

  const {state} = useLocation();

  useEffect(() => {
    setColors([]);
  }, [state]);

  return (
    <div>
      <Header />
      <div id="nft-detail-card-wrapper">
        <Card
          width={isMobile ? "100%" : "65vw"}
          height={isMobile ? "700px" : "75vh"}
          blurColor={colors[0]}
          child={
            <div id="detail-content">
              <ColorExtractor getColors={getColors}>
                <img id="detail-image" src={state.item.image} />
              </ColorExtractor>
              <div id="detail-info">
                <div id="detail-info-container">
                  {/* <p id="collection"> {state.item.name} </p> */}
                  <p id="name"> {state.item.name} </p>
                  <p id="description"> {state.item.description} </p>
                </div>

                <div id="detail-controls">
                  <Button
                    width={isMobile ? "70%" : "70%"}
                    height="50px"
                    child={
                      <div id="button-child">
                        <FaEthereum size="28px" />
                        <p id="price">{state.item.price}</p>
                      </div>
                    }
                  ></Button>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default NFTDetail;
