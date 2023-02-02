// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {getPerformanceScores} from "@/service/query/marchMadness/performanceQuery";

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const scores = await getPerformanceScores(req.body.team);
  res.status(200).json(scores)
}
