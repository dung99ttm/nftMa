import {useEffect, useState} from "react";
import "../styles/Activity.css";
import Header from "../components/Header";
import axios from "axios";
import {nftmarketaddress} from "../config";
import {ethers} from "ethers";
const Market = require("../artifacts/contracts/Market.sol/NFTMarket.json").abi;

const inter = new ethers.utils.Interface(Market);

const Activity = () => {
  const [data, setData] = useState([]);

  useEffect(async () => {
    const url =
      `https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=${nftmarketaddress}&startblock=0&endblock=99999999&sort=desc&apikey=NA49TH79XG8ZUUV75X5CC9REN4HDE224M7`;
    const res = await axios({
      method: "get",
      url: url,
    });

    await res.data.result.map(async (e) => {
      try {
        const decodedInput = await inter.parseTransaction({data: e.input});
        e.method = decodedInput.name;

        return e;
      } catch (e) {
        e.method = "";
        return e;
      }
    });

    await res.data.result.map(async (e) => {
      try {
        const value = await ethers.utils.formatEther(e.value);
        e.value = value;

        return e;
      } catch (e) {
        e.value = 0;
        return e;
      }
    });

    setData(res.data.result);
  }, []);

  return (
    <div id="explore">
      <Header />
      <div style={{height: "95px"}}></div>
      {/* <TextInput
        placeholder="Explore NFTs"
        icon={<AiOutlineSearch size="30" color="rgba(48,118,234,1)" />}
        onChange={(e) => setSearch(e.target.value)}
      /> */}
      <div id="list-container-acti">
        <table className="container">
          <thead>
            <tr>
              <th style={{width: "10%"}}>
                <h1>Txn Hash</h1>
              </th>
              <th style={{width: "10%"}}>
                <h1>Method</h1>
              </th>
              <th style={{width: "8%"}}>
                <h1>Block</h1>
              </th>
              <th style={{width: "10%"}}>
                <h1>Age</h1>
              </th>
              <th style={{width: "20%"}}>
                <h1>From</h1>
              </th>
              <th style={{width: "20%"}}>
                <h1>To</h1>
              </th>
              <th style={{width: "6%"}}>
                <h1>Value</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length !== 0 &&
              data.map((e, index) => {
                let time = new Date(
                  parseInt(e.timeStamp) * 1000
                ).toDateString();
                let check = e.method === "createMarketItem" ? 1 : e.method === "resellToken" ? 2 : e.method === "createMarketSale" ? 3 : 0;
                return (
                  <tr key={index} style={check === 1 ? { color: 'red'} : check === 2 ? { color: 'yellow'} : check === 3 ? { color: 'green'} : {}}>
                    <td>{e.hash}</td>
                    <td>{e.method}</td>
                    <td>{e.blockNumber}</td>
                    <td>{time}</td>
                    <td>{e.from}</td>
                    <td>{e.to}</td>
                    <td>{e.value}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activity;
