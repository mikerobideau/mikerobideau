import {executeQuery} from "@/lib/db";
import {asJson} from "@/util/jsonUtil";

export const getTeams = async(): Promise<any> => {
    try {
        const result = await executeQuery(`
            SELECT
                *
            FROM ncaa_d1_basketball_conference
            WHERE year = 2023
        `, []);
        return asJson(result);

    } catch (error) {
        console.log( error );
        return null;
    }
}