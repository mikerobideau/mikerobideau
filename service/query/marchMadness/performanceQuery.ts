import {executeQuery} from "@/lib/db";
import {asJson} from "@/util/jsonUtil";

export const getPerformanceScores = async(team: string): Promise<any> => {
    try {
        const result = await executeQuery(`
            SELECT
                *
            FROM ncaa_d1_basketball_performance
            WHERE team1 = ?
            AND year = 2023
        `, [team]);
        return asJson(result);

    } catch (error) {
        console.log( error );
        return null;
    }
}