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
    strength: number;
}

export interface SimulationResult {
    team1: string;
    team1WinPct: number;
    team2: string;
    team2WinPct: number;
    diffCounts: DiffCount[];
    forceNodes: ForceNode[];
}

export interface DiffCount {
    diff: number;
    count: number;
    count_spread?: number;
}

export interface DiffFrequencies {
    [diff: string]: number;
}

export interface ForceNode {
    diff: number
}

export type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface SimulatedGame {
    winner: string,
    wonBy: number
}