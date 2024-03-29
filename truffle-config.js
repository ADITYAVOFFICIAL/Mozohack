require('dotenv').config();
const { MNEMONIC, PROJECT_ID } = process.env;
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  contracts_build_directory: "./public/contracts",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    sepolia: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://eth-sepolia.g.alchemy.com/v2/${PROJECT_ID}`),
      network_id: "11155111",
      confirmations: 2,
      timeoutBlocks: 200,
      gas: 4465030,
      skipDryRun: true
    },
    avalanche: {
      provider: () => new HDWalletProvider(MNEMONIC, 'https://api.avax.network/ext/bc/C/rpc'),
      network_id: 43114, // Avalanche Fuji C-Chain
      gas: 8000000,
      gasPrice: 470000000000, // 470 gwei
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    polygon: {
      provider: () => new HDWalletProvider(MNEMONIC, 'https://rpc-mainnet.matic.network'),
      network_id: 137, // Polygon Mainnet
      gas: 8000000,
      gasPrice: 1000000000, // 1 gwei
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  mocha: {},
  compilers: {
    solc: {
      version: "0.8.19",
      settings: {
        optimizer: {
          enabled: true,
          runs: 1,
        },
      },
    },
  },
};
