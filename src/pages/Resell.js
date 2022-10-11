import {useState, useEffect, useContext, useRef} from "react";
import Button from "../components/base/Button";
import Card from "../components/base/Card";
import Select from "../components/base/Select";
import TextArea from "../components/base/TextArea";
import TextInput from "../components/base/TextInput";
import Header from "../components/Header";
import {useLocation} from "react-router";
import "../styles/Create.css";
import {ColorExtractor} from "react-color-extractor";
import {FaEthereum} from "react-icons/fa";
import {useMobile} from "../hooks/isMobile";
import {ethers} from "ethers";
import {create as ipfsHttpClient} from "ipfs-http-client";
import {nftaddress} from "../config";
import {ProviderContext} from "../providers/DappProvider";
import imageEmpty from "../assets/inputImage.png";
import {useNavigate} from "react-router-dom";

const Resell = () => {
  const {contractNft, contractNftMarket} = useContext(ProviderContext);
  const isMobile = useMobile();
  const [colors, setColors] = useState([]);
  const navigate = useNavigate();
  const {state} = useLocation();
console.log(state);
  const [price, setPrice] = useState(state.item.price);

  const getColors = (colors) => {
    setColors((c) => [...c, ...colors]);
  };

  useEffect(() => {
    setColors([]);
  }, [state]);

  async function resellNft(nft) {
    if (!price) return;

    try {
      resellSale(nft);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function resellSale(nft) {
    const transNft = await contractNft.giveResaleApproval(nft.tokenId);
    await transNft.wait();
    
    const priceRe = ethers.utils.parseUnits(price.toString(), "ether");

    let listingPrice = await contractNftMarket.getListingPrice();
    listingPrice = listingPrice.toString();

    const transaction = await contractNftMarket.resellToken(
      nft.itemId,
      nftaddress,
      priceRe,
      {
        value: listingPrice,
      }
    );

    await transaction.wait();
    navigate("/listings");
  }

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
                  <p id="name"> {"Name"} </p>
                  <TextInput
                    width="80%"
                    height="30px"
                    defaultValue={state.item.name}
                    readOnly={true}
                  />
                  <p id="description-c">{"Description"}</p>
                  <TextArea
                    width="80%"
                    height="25vh"
                    defaultValue={state.item.description}
                    readOnly={true}
                  />
                  <p id="description-c">{"Price"}</p>
                  <TextInput
                    width="80%"
                    height="30px"
                    defaultValue={state.item.price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div id="detail-controls">
                  <Button
                    width={isMobile ? "70%" : "80%"}
                    height="50px"
                    onClick={() => resellNft({itemId: state.item.itemId, tokenId: state.item.tokenId})}
                    child={
                      <div id="button-child">
                        <p id="price">Lưu</p>
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

export default Resell;
