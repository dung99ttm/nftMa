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

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const Create = () => {
  const {contractNft, contractNftMarket} = useContext(ProviderContext);
  const inputImage = useRef(null);
  const isMobile = useMobile();
  const navigate = useNavigate();
  const [colors, setColors] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);

  const [formInput, updateFormInput] = useState({
    price: "0.1",
    name: "Abc",
    description: "hahahahah",
  });

  const getColors = (colors) => {
    setColors((c) => [...c, ...colors]);
  };

  const {state} = useLocation();

  useEffect(() => {
    setColors([]);
  }, [state]);

  async function onChange(e) {
    const file = e.target.files[0];

    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function createMarket() {
    const {name, description, price} = formInput;
    if (!name || !description || !price || !fileUrl) return;

    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });

    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      createSale(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function createSale(url) {
    let transaction = await contractNft.createToken(url);
    let tx = await transaction.wait();

    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();
    const price = ethers.utils.parseUnits(formInput.price, "ether");

    let listingPrice = await contractNftMarket.getListingPrice();
    listingPrice = listingPrice.toString();
    transaction = await contractNftMarket.createMarketItem(
      nftaddress,
      tokenId,
      price,
      {
        value: listingPrice,
      }
    );
    await transaction.wait();
    navigate("/");

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
              <input
                type="file"
                name="Asset"
                ref={inputImage}
                className="my-4"
                onChange={onChange}
                style={{display: "none"}}
              />
              {fileUrl ? (
                <ColorExtractor getColors={getColors}>
                  <img id="detail-image" src={fileUrl} />
                </ColorExtractor>
              ) : (
                <ColorExtractor getColors={getColors}>
                  <img
                    id="detail-image"
                    src={imageEmpty}
                    onClick={() => inputImage.current.click()}
                  />
                </ColorExtractor>
              )}
              <div id="detail-info">
                <div id="detail-info-container">
                  <p id="name"> {"Name"} </p>
                  <TextInput
                    width="80%"
                    height="30px"
                    onChange={(e) =>
                      updateFormInput({...formInput, name: e.target.value})
                    }
                  />
                  <p id="description-c">{"Description"}</p>
                  <TextArea
                    width="80%"
                    height="25vh"
                    onChange={(e) =>
                      updateFormInput({
                        ...formInput,
                        description: e.target.value,
                      })
                    }
                  />
                  <p id="description-c">{"Price"}</p>
                  <TextInput
                    width="80%"
                    height="30px"
                    onChange={(e) =>
                      updateFormInput({
                        ...formInput,
                        price: e.target.value,
                      })
                    }
                  />
                </div>
                <div id="detail-controls">
                  <Button
                    width={isMobile ? "70%" : "80%"}
                    height="50px"
                    onClick={createMarket}
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

export default Create;
