import {executeQuery} from "@/lib/db";
import {asJson} from "@/util/jsonUtil";

export const getPerformanceScores = async(team: string): Promise<any> => {
    try {
        const result = await executeQuery(`
            SELECT
                year,
                team1,
                team1_score,
                team1_logo.logo AS team1_logo,
                team2,
                team2_score,
                team2_logo.logo AS team2_logo,
                spread,
                diff,
                capped_diff,
                adjusted,
                precise_spread,
                performance_score,
                grade
            FROM ncaa_d1_basketball_performance
            JOIN (
                SELECT team, logo FROM ncaa_d1_basketball_conference
            ) team1_logo ON team1_logo.team = team1
            JOIN (
                SELECT team, logo FROM ncaa_d1_basketball_conference
            ) team2_logo ON team2_logo.team = team2
            WHERE team1 = ?
            AND year = 2023
        `, [team]);
        return asJson(result);

    } catch (error) {
        console.log( error );
        return null;
    }
}