import React from "react";
import NFTCard from "./NFTCard";
import "../styles/CardList.css";
import {useNavigate} from "react-router-dom";

const CardList = ({list, buyNft, type = "horizontal"}) => {
  let navigate = useNavigate();

  return (
    <div
      id="card-list"
      style={{flexDirection: type === "horizontal" ? "row" : "column"}}
    >
      {list.map((item) => (
        <NFTCard
          nftSrc={item.image}
          // nftOwner={item.owner}
          buyNft={() => {
            buyNft(item);
          }}
          nftName={item.name}
          nftDescription={item.description}
          nftSeller={item.price}
          key={item.itemId}
          onClick={() => navigate("/detail", {state: {item: item}})}
        />
      ))}
    </div>
  );
};

export default CardList;
