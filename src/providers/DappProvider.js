import {useState, createContext, useEffect} from "react";
import {ethers} from "ethers";
import Web3Modal from "web3modal";
import {nftaddress, nftmarketaddress} from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/Market.sol/NFTMarket.json";

export const ProviderContext = createContext();

export const DappProvider = ({children}) => {
  const [contractNft, setContractNft] = useState();
  const [contractNftMarket, setContractNftMarket] = useState();
  const [account, setAccount] = useState(null);

  useEffect(async () => {
    handleWallet();
  }, []);

  const handleWallet = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    setContractNft(new ethers.Contract(nftaddress, NFT.abi, signer));
    setContractNftMarket(new ethers.Contract(nftmarketaddress, Market.abi, signer));
    setAccount(await signer.getAddress());
  };

  const value = {
    account,
    contractNft,
    contractNftMarket,
    handleWallet,
  };
  return (
    <ProviderContext.Provider value={value}>
      {children}
    </ProviderContext.Provider>
  );
};
