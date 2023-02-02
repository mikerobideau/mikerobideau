import {executeQuery} from "../lib/db";

export const query = async (queryStatement: string, values?: any[]) => {
    try {
        return await executeQuery(queryStatement, values);
    } catch ( error ) {
        console.log( error );
    }
};