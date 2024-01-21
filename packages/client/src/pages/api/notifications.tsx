import type { NextApiRequest, NextApiResponse } from 'next';

import { fetchPoolsData } from '@/utils';

type ResponseData = {
  notification: string;
};

type Pool = {
  id: string,
  name: string,
  totalLiquidityUSD: string
}
let storage : Pool[] = []

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const data = await fetchPoolsData();
  const filtered = data.formattedPoolReserves.map(
    ({ id, name, totalLiquidityUSD }) => ({ id, name, totalLiquidityUSD })
  );
  if (storage.length === 0) {
    storage = filtered
    res.status(200).json({ notification: "" });
  } else {
    let notification = ""
    for (const pool of storage) {
      const filtered_pool = filtered.filter(({id}) => id === pool.id)[0]
      const objIndex = storage.findIndex((obj => obj.id === pool.id));

      if (Number(filtered_pool.totalLiquidityUSD) >= Number(pool.totalLiquidityUSD) + 10000) {
        notification = `[AAVE] Pool ${pool.name}: + ${Number(filtered_pool.totalLiquidityUSD) - Number(pool.totalLiquidityUSD)}`
        storage[objIndex].totalLiquidityUSD = filtered_pool.totalLiquidityUSD;
        break;
      }
      if (Number(filtered_pool.totalLiquidityUSD) <= Number(pool.totalLiquidityUSD) - 10000) {
        notification = `[AAVE] Pool ${pool.name}: - ${Number(filtered_pool.totalLiquidityUSD) - Number(pool.totalLiquidityUSD)}`
        storage[objIndex].totalLiquidityUSD = filtered_pool.totalLiquidityUSD;
        break;
      }
    }
    res.status(200).json({ notification });
  }
}
