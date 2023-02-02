import {postJson} from "@/service/fetchService";
import {Score, SimulationResult} from "@/components/MarchMadness/Model";
import {SCORE_ENDPOINT, SIMULATE_ENDPOINT} from "@/components/MarchMadness/endpoint";

export const getScores = async (team: string): Promise<Score[]> =>
    await postJson(SCORE_ENDPOINT, {team});

export const simulate = async (team1: string, team1Scores: Score[], team2: string, team2Scores: Score[]):
    Promise<SimulationResult> => await postJson(SIMULATE_ENDPOINT, {team1, team1Scores, team2, team2Scores});

