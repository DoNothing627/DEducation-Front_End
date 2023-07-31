/* eslint-disable no-unused-vars */
import { ethers } from 'ethers';

const CLOUDFLARE_ENDPOINT = 'https://goerli.prylabs.net';
const MAIN_ENDPOINT = 'https://eth-sepolia.g.alchemy.com/v2/6hEn0GSsX1-l11Jk9SRfcpEghBBAXP8p';
const ALTERNATE_ENDPOINT = 'https://rpc.slock.it/goerli';
const UNSECURE_ENDPOINT = 'http://goerli.blockscout.com';
const QUICKNODE_ENDPOINT = process.env.REACT_APP_QUICKNODE_URL;

export function createProvider() {  
  return new ethers.providers.JsonRpcProvider(QUICKNODE_ENDPOINT || MAIN_ENDPOINT, 11155111);
}