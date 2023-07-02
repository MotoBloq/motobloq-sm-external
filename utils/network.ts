// based on https://github.com/wighawag/template-ethereum-contracts/blob/69e593a843fcecd233203af5c3d4d57dead9046b/utils/network.ts

import 'dotenv/config';
import {HDAccountsUserConfig, HttpNetworkUserConfig, NetworksUserConfig} from 'hardhat/types';



export function nodeUrl(networkName: string): string {
  if (networkName) {
    const uri = process.env['ETH_NODE_URI_' + networkName.toUpperCase()];
    if (uri && uri !== '') {
      return uri;
    }
  }

  if (networkName === 'localhost') {
    // do not use ETH_NODE_URI
    return 'http://127.0.0.1:8545';
  }

  let uri = process.env.ETH_NODE_URI;
  if (uri) {
    uri = uri.replace('{{networkName}}', networkName);
  }
  if (!uri || uri === '') {
    return '';
    // throw new Error(`environment variable "ETH_NODE_URI" not configured `);
  }
  if (uri.indexOf('{{') >= 0) {
    throw new Error(`invalid uri or network not supported by node provider : ${uri}`);
  }
  return uri;
}

export function getKms(networkName?: string): string {
  if (networkName) {
    const kmsKeyId = process.env['KMS_KEY_ID_' + networkName.toUpperCase()];
    if (kmsKeyId && kmsKeyId !== '') {
      return kmsKeyId;
    }
  }

  throw new Error(`environment variable "KMS_KEY_ID" not configured for network ${networkName}`);
}

export function getMnemonic(networkName?: string): string {
  if (networkName) {
    const mnemonic = process.env['MNEMONIC_' + networkName.toUpperCase()];
    if (mnemonic && mnemonic !== '') {
      return mnemonic;
    }
  }

  const mnemonic = process.env.MNEMONIC;
  if (!mnemonic || mnemonic === '') {
    return 'test test test test test test test test test test test junk';
  }
  return mnemonic;
}

export function accounts(networkName?: string): {mnemonic: string} {
  return {mnemonic: getMnemonic(networkName)};
}