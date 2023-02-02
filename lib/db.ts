import mysql from 'serverless-mysql';

const db = mysql({
    config: {
        host: '127.0.0.1',
        port: 3306,
        database: 'march_madness',
        user: 'root',
        password: 'password'
    }
});

export const executeQuery = async (query: string, values: any[] | undefined): Promise<any> => {
    try {
        const results = await db.query(query, values);
        await db.end();
        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
};