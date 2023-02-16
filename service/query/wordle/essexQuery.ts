import {executeQuery} from "@/lib/db";
import {asJson} from "@/util/jsonUtil";

export const getAnswerByDate = async(date: string): Promise<any> => {
    try {
        const result = await executeQuery(`
            SELECT NAME
            FROM essex_wordle_names
            WHERE DATE = ?
            LIMIT 1
        `, [date]);
        const answer = asJson(result[0] );
        return answer?.NAME;
    } catch (error) {
        console.log( error );
        return null;
    }
}

export const addName = async(name: string): Promise<any> => {
    try {
        const result = await executeQuery(`
            INSERT INTO essex_wordle_names VALUES (?, null);
        `, [name]);
        return null;
    } catch (error) {
        console.log( error );
        return null;
    }
}

export const setAnswerDate = async(date: string): Promise<any> => {
    try {
        const result = await executeQuery(`
            UPDATE essex_wordle_names
            SET DATE = ?
            WHERE NAME = (SELECT NAME
            FROM (
                   SELECT NAME
                   FROM essex_wordle_names
                   ORDER BY RAND() LIMIT 1
            ) t);
        `, [date]);
        return null;
    } catch (error) {
        console.log( error );
        return null;
    }
}