import 'hardhat-deploy';
import '@nomicfoundation/hardhat-toolbox';
import "@rumblefishdev/hardhat-kms-signer";
import {HardhatUserConfig} from "hardhat/config";
import {accounts, getKms, nodeUrl} from './utils/network';
import "@rumblefishdev/hardhat-kms-signer";



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
      kmsKeyId: "326c2079-3c96-4a58-b111-92eae7340c4f"
    },
    // goerli: {
    //   url: nodeUrl('goerli'),
    //   kmsKeyId: getKms('goerli'),
    // },
    mainnet: {
      url: nodeUrl('mainnet'),
      accounts: accounts('mainnet'),
    },
  },
};

export default config;
