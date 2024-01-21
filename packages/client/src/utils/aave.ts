import {
  ChainId,
  GhoService,
  UiIncentiveDataProvider,
  UiPoolDataProvider,
} from '@aave/contract-helpers';
import {
  formatGhoReserveData,
  formatGhoUserData,
  formatReservesAndIncentives,
  formatUserSummaryAndIncentives,
} from '@aave/math-utils';
import * as dayjs from 'dayjs';
import { ethers } from 'ethers';

// https://github.com/bgd-labs/aave-address-book/blob/main/src/AaveV3Sepolia.sol

// Sample RPC address for querying ETH sepolia
const provider = new ethers.providers.JsonRpcProvider(
  'https://1rpc.io/sepolia'
);

// User address to fetch data for, insert address here
const currentAccount = '0x71C66b00f5799026dB8a4873C761Bd7643828e5E';

// View contract used to fetch all reserves data (including market base currency data), and user reserves
// Using Aave V3 Eth sepolia address for demo
const poolDataProviderContract = new UiPoolDataProvider({
  uiPoolDataProviderAddress: '0x69529987FA4A075D0C00B0128fa848dc9ebbE9CE', // Sepolia GHO Market
  provider,
  chainId: ChainId.sepolia,
});
const currentTimestamp = dayjs().unix();

// View contract used to fetch all reserve incentives (APRs), and user incentives
// Using Aave V3 Eth sepolia address for demo
const incentiveDataProviderContract = new UiIncentiveDataProvider({
  uiIncentiveDataProviderAddress: '0xBA25de9a7DC623B30799F33B770d31B44c2C3b77', // Sepolia GHO Market
  provider,
  chainId: ChainId.sepolia,
});

const ghoService = new GhoService({
  provider,
  uiGhoDataProviderAddress: '0x69B9843A16a6E9933125EBD97659BA3CCbE2Ef8A', // Sepolia GHO Market
});

const lendingPoolAddressProvider = '0x012bAC54348C0E635dCAc9D5FB99f06F24136C9A';

export async function fetchContractData() {
  // Object containing array of pool reserves and market base currency data
  // { reservesArray, baseCurrencyData }
  const reserves = await poolDataProviderContract.getReservesHumanized({
    lendingPoolAddressProvider, // Sepolia GHO Market
  });

  // Object containing array or users aave positions and active eMode category
  // { userReserves, userEmodeCategoryId }
  const userReserves = await poolDataProviderContract.getUserReservesHumanized({
    lendingPoolAddressProvider, // Sepolia GHO Market
    user: currentAccount,
  });

  // Array of incentive tokens with price feed and emission APR
  const reserveIncentives =
    await incentiveDataProviderContract.getReservesIncentivesDataHumanized({
      lendingPoolAddressProvider, // Sepolia GHO Market
    });

  // Dictionary of claimable user incentives
  const userIncentives =
    await incentiveDataProviderContract.getUserReservesIncentivesDataHumanized({
      lendingPoolAddressProvider, // Sepolia GHO Market
      user: currentAccount,
    });

  const ghoReserveData = await ghoService.getGhoReserveData();
  const ghoUserData = await ghoService.getGhoUserData(currentAccount);

  const formattedGhoReserveData = formatGhoReserveData({
    ghoReserveData,
  });
  const formattedGhoUserData = formatGhoUserData({
    ghoReserveData,
    ghoUserData,
    currentTimestamp,
  });

  const formattedPoolReserves = formatReservesAndIncentives({
    reserves: reserves.reservesData,
    currentTimestamp,
    marketReferenceCurrencyDecimals:
      reserves.baseCurrencyData.marketReferenceCurrencyDecimals,
    marketReferencePriceInUsd:
      reserves.baseCurrencyData.marketReferenceCurrencyPriceInUsd,
    reserveIncentives: reserveIncentives,
  });

  const userSummary = formatUserSummaryAndIncentives({
    currentTimestamp,
    marketReferencePriceInUsd:
      reserves.baseCurrencyData.marketReferenceCurrencyPriceInUsd,
    marketReferenceCurrencyDecimals:
      reserves.baseCurrencyData.marketReferenceCurrencyDecimals,
    userReserves: userReserves.userReserves,
    formattedReserves: formattedPoolReserves,
    userEmodeCategoryId: userReserves.userEmodeCategoryId,
    reserveIncentives: reserveIncentives,
    userIncentives: userIncentives,
  });

  const formattedUserSummary = userSummary;
  // Factor discounted GHO interest into cumulative user fields
  // if (formattedGhoUserData.userDiscountedGhoInterest > 0) {
  //   const userSummaryWithDiscount = formatUserSummaryWithDiscount({
  //     userGhoDiscountedInterest: formattedGhoUserData.userDiscountedGhoInterest,
  //     user,
  //     marketReferenceCurrencyPriceUSD: Number(
  //       formatUnits(
  //         reserves.baseCurrencyData.marketReferenceCurrencyPriceInUsd,
  //         USD_DECIMALS
  //       )
  //     ),
  //   });
  //   formattedUserSummary = {
  //     ...userSummary,
  //     ...userSummaryWithDiscount,
  //   };
  // }

  return {
    formattedGhoReserveData,
    formattedGhoUserData,
    formattedPoolReserves,
    formattedUserSummary,
  };
}

export async function fetchPoolsData() {
  const reserves = await poolDataProviderContract.getReservesHumanized({
    lendingPoolAddressProvider, // Sepolia GHO Market
  });

  const reserveIncentives =
    await incentiveDataProviderContract.getReservesIncentivesDataHumanized({
      lendingPoolAddressProvider, // Sepolia GHO Market
    });

  const formattedPoolReserves = formatReservesAndIncentives({
    reserves: reserves.reservesData,
    currentTimestamp,
    marketReferenceCurrencyDecimals:
      reserves.baseCurrencyData.marketReferenceCurrencyDecimals,
    marketReferencePriceInUsd:
      reserves.baseCurrencyData.marketReferenceCurrencyPriceInUsd,
    reserveIncentives: reserveIncentives,
  });

  return {
    formattedPoolReserves,
  };
}
