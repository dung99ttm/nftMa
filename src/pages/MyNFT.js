import {useEffect, useState, useContext} from "react";
import CardList from "../components/CardList";
import "../styles/Explore.css";
import Header from "../components/Header";
import axios from "axios";
import {ethers} from "ethers";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/Market.sol/NFTMarket.json";
import {ProviderContext} from "../providers/DappProvider";
import {useLocation} from "react-router";

const MyNFT = () => {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const {contractNft, contractNftMarket} = useContext(ProviderContext);
  const location = useLocation();

  useEffect(() => {
    contractNftMarket && loadNFTs();
  }, [contractNftMarket]);

  const loadNFTs = async () => {
    const data = await contractNftMarket.fetchMyNFTs();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await contractNft.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          itemId: i.itemId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          tokenId: i.tokenId,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  };
  console.log(nfts);
  return (
    <div id="MyNFT">
      <Header />
      <div style={{height: "95px"}}></div>
      <div id="list-container">
        <CardList
          list={nfts}
          myNFT={true}
        />
      </div>
    </div>
  );
};

export default MyNFT;
