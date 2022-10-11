import {useEffect, useState, useContext} from "react";
import Hero from "../components/Hero";
import "../styles/Home.css";
import CardList from "../components/CardList";
import axios from "axios";
import {ethers} from "ethers";
import {nftaddress} from "../config";
import {hotDropsData} from "../constants/MockupData";
import {ProviderContext} from "../providers/DappProvider";

const Home = () => {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const {contractNft, contractNftMarket} = useContext(ProviderContext);

  useEffect(() => {
    contractNftMarket && loadNFTs();
  }, [contractNftMarket]);

  const loadNFTs = async () => {
    const data = await contractNftMarket.fetchMarketItems();

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

  async function buyNft(nft) {
    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contractNftMarket.createMarketSale(
      nftaddress,
      nft.itemId,
      {
        value: price,
      }
    );
    await transaction.wait();
    loadNFTs();
    return;
  }

  return (
    <div id="home">
      <Hero list={hotDropsData} />
      <p id="card-list-header-text"> Hot Drops </p>
      <div id="list-container">
        <CardList list={nfts} buyNft={buyNft}/>
      </div>
    </div>
  );
};

export default Home;
