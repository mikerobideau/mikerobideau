export interface Score {
    team1: string,
    team1_score: number,
    team2: string,
    team2_score: number,
    spread: number,
    diff: number,
    capped_diff: number,
    adjusted: number,
    precise_spread: number,
    performance_score: number,
    grade: string
}

export interface Team {
    year: number,
    team: string,
    conference: string
}

export interface SimulationResult {
    team1: string;
    team1WinPct: string;
    team2: string;
    team2WinPct: string;
}