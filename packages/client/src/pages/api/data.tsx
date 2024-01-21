import type { NextApiRequest, NextApiResponse } from 'next';

import { fetchContractData } from '@/utils';

type ResponseData = {
  formattedGhoReserveData: any;
  formattedGhoUserData: any;
  formattedPoolReserves: any;
  formattedUserSummary: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const data = await fetchContractData();
  res.status(200).json(data);
}
