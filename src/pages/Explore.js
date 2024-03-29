import {useEffect, useState, useContext} from "react";
import CardList from "../components/CardList";
import "../styles/Explore.css";
import Header from "../components/Header";
import TextInput from "../components/base/TextInput";
import axios from "axios";
import Web3Modal from "web3modal";
import {ethers} from "ethers";
import {nftaddress} from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/Market.sol/NFTMarket.json";
import {ProviderContext} from "../providers/DappProvider";
import {AiOutlineSearch} from "react-icons/ai";

const Explore = () => {
  const [nfts, setNfts] = useState([]);
  const [nftsSearch, setNftsSearch] = useState([]);
  const [search, setSearch] = useState("");
  const [loadingState, setLoadingState] = useState("not-loaded");
  const {contractNft, contractNftMarket} = useContext(ProviderContext);

  useEffect(() => {
    contractNftMarket && loadNFTs();
  }, [contractNftMarket]);

  useEffect(() => {
    if (search === "") {
      setNfts(nftsSearch);
    } else {
      const itemsFilter = nftsSearch.filter((nft) => nft?.name.startsWith(search));
      setNfts(itemsFilter);
    }
  }, [search]);

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
    setNftsSearch(items);
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
    <div id="explore">
      <Header />
      <div style={{height: "95px"}}></div>
      <TextInput
        placeholder="Explore NFTs"
        icon={<AiOutlineSearch size="30" color="rgba(48,118,234,1)" />}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div id="list-container">
        <CardList list={nfts} buyNft={buyNft}/>
      </div>
    </div>
  );
};

export default Explore;
