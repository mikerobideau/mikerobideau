// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Score, SimulationResult} from "@/components/MarchMadness/Model";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SimulationResult>
) {
    if(req.body.team1 === req.body.team2) {
        res.status(200).json({
            team1: req.body.team1,
            team1WinPct: 50,
            team2: req.body.team2,
            team2WinPct: 50,
        });
    } else {
        const NUM_TRIALS = 100000;
        let team1Wins = 0;
        let team2Wins = 0;
        let i = 0;

        while (i < NUM_TRIALS) {
            const team1Score = getRandomScore(req.body.team1Scores);
            const team2Score = getRandomScore(req.body.team2Scores);
            if (team1Score > team2Score) {
                team1Wins = team1Wins + 1;
                i = i + 1;
            } else if (team2Score > team1Score) {
                team2Wins = team2Wins + 1;
                i = i + 1;
            }
        }

        const team1WinPct = team1Wins / NUM_TRIALS * 100;
        const team2WinPct = team2Wins / NUM_TRIALS * 100;

        res.status(200).json({
            team1: req.body.team1,
            team1WinPct: team1WinPct,
            team2: req.body.team2,
            team2WinPct: team2WinPct,
        });
    }
}

const getRandomScore = (scores: Score[]): number => {
    const random = Math.floor(Math.random() * scores.length);
    return scores[random].performance_score;
}

