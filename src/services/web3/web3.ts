import Web3 from 'web3';
import { Unit } from 'web3-utils';
import BN from 'bn.js';
// import { BscConnector } from '@binance-chain/bsc-connector';
// import { ConnectorNames } from '@app/dekits/components/connect-wallet-modal/connectors';
import { AbstractProvider } from 'web3-core';

/** @see https://github.com/indutny/bn.js/issues/182#issuecomment-492450308 */
const units: { [k: string]: Unit } = {
  "0": "noether",
  "1": "wei",
  "3": "kwei",
  "6": "mwei",
  "9": "gwei",
  "12": "microether",
  "15:": "milliether",
  "18": "ether",
  "21": "kether",
  "24": "mether",
  "27": "tether",
};

const binanceProvider = {
  56:[
    'https://bsc-mainnet.nodereal.io/v1/4c8fa93b08cd4cd9aad61e59ebf91206',
  ],
  97:[
    'https://data-seed-prebsc-1-s1.binance.org:8545/',
    'https://data-seed-prebsc-2-s1.binance.org:8545/',
    'https://data-seed-prebsc-1-s2.binance.org:8545/',
  ],
};

export const getContractInstance = async (
  ABIContract: any,
  contractAddress: string,
  chain_id?: string | number,
  index?: number
) => {
  const web3Instance = await getWeb3Instance(chain_id, index);

  return new web3Instance.eth.Contract(
    ABIContract,
    contractAddress,
  );
};

/**
 * Convert raw "token value"(usually from user input) to the smallest unit
 * of the token based on its decimals.
 *
 * _Use case: you will need this function for converting token before
 * put it into the contract._
 *
 * @param value Token value - a string number.
 * @param decimals
 * @returns
 */
export function toBN(value: string | number, decimals: number | string): BN {
  if (!value) {
    return Web3.utils.toBN(0);
  }

  const wei = Web3.utils.toWei(value.toString(), units[decimals]);
  return Web3.utils.toBN(wei);
}

/**
 * The opposite of `toBN`.
 *
 * _Use case: you will need this function when display token as unit to user._
 *
 * @see toBN
 */
export function fromWei(value: string, decimals: number | string) {
  return Web3.utils.fromWei(value, units[decimals]);
}

export const getWeb3Instance = async (chain_id?: string | number, index = 0) => {
//   if (chain_id && binanceProvider[+chain_id]?.[index]) {
//     return new Web3(binanceProvider[+chain_id]?.[index]);
//   }

  const nativeProvider = await getNativeProvider(localStorage.getItem('wallet'));
  return nativeProvider;
};

const getNativeProvider = async (walletName: string | null) => {
  let nativeProvider: AbstractProvider = Web3.givenProvider;

//   if (walletName && walletName === ConnectorNames.BSC) {
//     const bsc = new BscConnector({});
//     nativeProvider = await bsc.getProvider();
//   }

  return new Web3(nativeProvider);
};

export const getCurrentChainId = async () => {
  const web3 = await getWeb3Instance();
  const chainId = await web3.eth.getChainId();

  return chainId;
};
