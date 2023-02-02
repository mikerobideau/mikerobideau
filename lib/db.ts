import mysql from 'serverless-mysql';

const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        port: 3306,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
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