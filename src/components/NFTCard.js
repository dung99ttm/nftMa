import React, {useState} from "react";
import "../styles/NFTCard.css";
import {FaEthereum} from "react-icons/fa";
import {AiOutlineHeart, AiFillHeart} from "react-icons/ai";
import {ColorExtractor} from "react-color-extractor";
import Card from "./base/Card";
import Button from "./base/Button";
import {Colors} from "../constants/Colors";

const NFTCard = ({
  nftSrc,
  nftName,
  nftSeller,
  nftOwner,
  nftDescription,
  likeCount,
  gradient,
  onClick,
  handleNft,
  myNFT,
  listing,
}) => {
  const [isLike, setIsLike] = useState(false);
  const [colors, setColors] = useState([]);

  const like = () => setIsLike(!isLike);

  const getColors = (colors) => {
    setColors((c) => [...c, ...colors]);
  };

  return (
    <Card
      blurColor={colors[0]}
      child={
        <>
          <ColorExtractor getColors={getColors}>
            <img className="nft-image" src={nftSrc} onClick={onClick} />
          </ColorExtractor>
          <div className="wrapper">
            <div className="info-container">
              <p className="owner">'''</p>
              <p className="name">{nftName}</p>
            </div>

            <div className="price-container">
              <p className="price-label">Price</p>
              <p className="price">
                {" "}
                <FaEthereum /> {nftSeller}
              </p>
            </div>
          </div>
          <div className="buttons" style={listing ? {display: "none"} : {}}>
            <Button
              color={Colors.buttons.primary}
              textContent={myNFT ? "Listing" : "Buy Now"}
              onClick={handleNft}
            />
          </div>
        </>
      }
    ></Card>
  );
};

export default NFTCard;
