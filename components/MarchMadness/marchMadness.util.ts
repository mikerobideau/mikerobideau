import {Score, Team} from "@/components/MarchMadness/Model";

export const getRecord = (scores: Score[]): number[] => {
    const wins = scores.filter(({team1_score, team2_score}) =>
        team1_score > team2_score).length;
    return [wins, scores.length - wins];
}

export const getOpponentStrength = (spread: number) => {
    if (spread > 10) {
        return 'Elite';
    } else if (spread > 5) {
        return 'Very strong';
    } else if (spread > 0) {
        return 'Strong';
    } else if (spread > -5) {
        return 'Above average'
    } else if (spread > -10) {
        return 'Average';
    } else if (spread > -15) {
        return 'Below average'
    } else if (spread > - 20) {
        return 'Weak'
    } else if (spread > - 25) {
        return 'Very weak'
    } else {
        return 'Extremely weak'
    }
}

export const sortScores = (scores: Score[]) => scores.sort((a: Score, b: Score) => {
    if (a.performance_score > b.performance_score) {
        return -1;
    } else if (b.performance_score > a.performance_score) {
        return 1;
    } else {
        return 0;
    }
});

export const getTeam = (teamName: string | null | undefined, teams: Team[]): Team | undefined =>
    teams?.find((team: Team) => team.team === teamName)

export const getFilteredScores = (scores: Score[] | undefined, selectedOpponentStrengths: string[]): Score[] =>
    scores
        ? scores.filter(score =>
            selectedOpponentStrengths.includes(getOpponentStrength(score.precise_spread)))
        : [];

export const getWinPctColor = (winPct: number | undefined) =>
    winPct && Math.round(winPct) >= 50 ? '#4CAF50' : '#E57373';

export const getWinPctWidth = (winPct: number | undefined) =>
    winPct ? Math.round(winPct) / 100 * 400 : 0;