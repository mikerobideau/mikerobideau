// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {DiffCount, DiffFrequencies, ForceNode, Score, SimulationResult} from "@/components/MarchMadness/Model";
require('largest-remainder-round');

const NUM_TRIALS = 100000;

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
            diffCounts: [],
            forceNodes: []
        });
    } else {
        let team1Wins = 0;
        let team2Wins = 0;
        let i = 0;
        let diffs: number[] = [];

        while (i < NUM_TRIALS) {
            const team1Score = getRandomScore(req.body.team1Scores);
            const team2Score = getRandomScore(req.body.team2Scores);
            const team1ScoreRounded = Math.round(team1Score);
            const team2ScoreRounded = Math.round(team2Score);
            if (team1ScoreRounded > team2ScoreRounded) {
                team1Wins = team1Wins + 1;
                i = i + 1;
                diffs.push(team1ScoreRounded - team2ScoreRounded);
            } else if (team2ScoreRounded> team1ScoreRounded) {
                team2Wins = team2Wins + 1;
                i = i + 1;
                diffs.push(team1ScoreRounded - team2ScoreRounded);
            }
        }

        const team1WinPct = team1Wins / NUM_TRIALS * 100;
        const team2WinPct = team2Wins / NUM_TRIALS * 100;
        const diffCounts = toRoundedPercentages(toFrequencies(diffs));

        res.status(200).json({
            team1: req.body.team1,
            team1WinPct: team1WinPct,
            team2: req.body.team2,
            team2WinPct: team2WinPct,
            diffCounts: diffCounts,
            forceNodes: toForceNodes(diffCounts)
        });
    }
}

const getRandomScore = (scores: Score[]): number => {
    const random = Math.floor(Math.random() * scores.length);
    return scores[random].performance_score;
}

const toFrequencies = (diffs: number[]): DiffFrequencies =>
    diffs.reduce(function (acc, curr) {
        //@ts-ignore
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
    }, {})

const toRoundedPercentages = (frequencies: DiffFrequencies): DiffCount[] => {
    let diffs: any = [];

    Object.keys(frequencies).forEach(key => {
        diffs.push({diff: key, count: frequencies[key]});
    });

    return diffs.spread({prop: 'count'})
        .filter((diff: any) => diff.count_spread != 0);
}

const toForceNodes = (diff: DiffCount[]): ForceNode[] => {
    let out: any = [];
    diff.forEach((diff: any) => {
       for(let i = 0; i < diff.count_spread; i++) {
           const node: ForceNode = {diff: +diff.diff};
           out.push(node);
       }
    });
    return out;
}

