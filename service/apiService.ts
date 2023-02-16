import {executeQuery} from "../lib/db";

export const getJson = async(url: string) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        }
    });
    return response.json();
}

export const postJson = async(url: string, body: any) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(body),
    });
    return response.json();
}

export const postForm = async(url: string, formData: FormData) => {
    const response = await fetch(url, {
        method: 'POST',
        body: formData,
    });
    return response.json();
}

export const query = async (queryStatement: string, values?: any[]) => {
    try {
        return await executeQuery(queryStatement, values);
    } catch ( error ) {
        console.log( error );
    }
};