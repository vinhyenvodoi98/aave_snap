import { fetchContractData } from '@/utils'
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  formattedGhoReserveData : any
  formattedGhoUserData : any
  formattedPoolReserves : any
  formattedUserSummary : any
}

export default async function  handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const data = await fetchContractData()
  res.status(200).json(data)
}