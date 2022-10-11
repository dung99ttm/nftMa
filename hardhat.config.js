require("@nomiclabs/hardhat-waffle");
const fs = require("fs");
const privateKey = fs.readFileSync(".secret").toString().trim();

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      chainId: 80001,
      // url: `https://polygon-mumbai.infura.io/v3/${infuraId}`
      url: "https://polygon-mumbai.infura.io/v3/e2e7dedf5ce6496285403e29fa2cc751",
      accounts: [privateKey]
    },
    matic: {
      // url: `https://polygon-mainnet.infura.io/v3/${infuraId}`,
      url: "https://rpc-mainnet.maticvigil.com",
      accounts: [privateKey]
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    apiKey: `${process.env.API_KEY_ETHERSCAN}`,
  },
  paths: {
    cache: "./src/cache",
    artifacts: "./src/artifacts",
  },
};
