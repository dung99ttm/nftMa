import NFTCard from "./NFTCard";
import "../styles/CardList.css";
import {useNavigate} from "react-router-dom";

const CardList = ({
  list,
  buyNft,
  type = "horizontal",
  myNFT = false,
  listing = false,
}) => {
  const navigate = useNavigate();

  const handleNft = (item) => {
    !myNFT ? buyNft(item) : navigate("/resell", {state: {item: item}});
  };

  return (
    <div
      id="card-list"
      style={{flexDirection: type === "horizontal" ? "row" : "column"}}
    >
      {list.map((item) => (
        <NFTCard
          nftSrc={item.image}
          handleNft={() => handleNft(item)}
          myNFT={myNFT}
          listing={listing}
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
