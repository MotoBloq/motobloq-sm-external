import 'hardhat-deploy';
import '@nomicfoundation/hardhat-toolbox';
import {HardhatUserConfig} from "hardhat/config";
import {nodeUrl, accounts} from './utils/network';


const config: HardhatUserConfig = {
  solidity: {
    compilers: [{
      version: '0.8.17', settings: {
        optimizer: {
          enabled: true, runs: 2000
        }
      }
    }]
  },
  defaultNetwork: "hardhat",
  namedAccounts: {
    deployer: 0,
    royaltyReceiver: 1,
  },
  networks: {
    hardhat: {},
    localhost: {
      url: nodeUrl('localhost'),
      accounts: accounts(),
    },
    sepolia: {
      url: nodeUrl('sepolia'),
      accounts: accounts('sepolia'),
    },
    goerli: {
      url: nodeUrl('goerli'),
      accounts: accounts('goerli'),
    },
    mainnet: {
      url: nodeUrl('mainnet'),
      accounts: accounts('mainnet'),
    },
  },
};

export default config;
