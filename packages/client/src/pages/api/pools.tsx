import type { NextApiRequest, NextApiResponse } from 'next';

import { fetchPoolsData } from '@/utils';

type ResponseData = {
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const data = await fetchPoolsData();
  const filtered = data.formattedPoolReserves.map(
    ({ name, supplyAPY, isIsolated }) => ({ name, supplyAPY, isIsolated })
  );
  // name
  // supplyAPY
  // isIsolated
  // totalLiquidity
  // totalLiquidityUSD
  // totalDebt
  // borrowUsageRatio
  res.status(200).json({ data: filtered });
}
