export interface Score {
    team1: string;
    team1_score: number;
    team1_logo: string;
    team2: string;
    team2_score: number;
    team2_logo: string;
    spread: number;
    diff: number;
    capped_diff: number;
    adjusted: number;
    precise_spread: number;
    performance_score: number;
    grade: string;
}

export interface Team {
    year: number;
    team: string;
    conference: string;
    logo: string;
}

export interface SimulationResult {
    team1: string;
    team1WinPct: number;
    team2: string;
    team2WinPct: number;
}