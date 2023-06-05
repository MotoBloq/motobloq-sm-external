import 'hardhat-deploy';
import '@nomicfoundation/hardhat-toolbox';
import "@rumblefishdev/hardhat-kms-signer";
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
    royaltyReceiver: 0,
  },
  networks: {
    hardhat: {},
    localhost: {
      url: nodeUrl('localhost'),
      accounts: accounts(),
    },
    sepolia: {
      url: nodeUrl('sepolia'),
      // accounts: accounts('sepolia'),
      kmsKeyId: "9026f063-b969-4279-93b4-0d7a006bf6b6"
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
