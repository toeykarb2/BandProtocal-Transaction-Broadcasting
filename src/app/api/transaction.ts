'use server'
import { HTTP_METHOD } from "../type/http.type";

export async function transactionAPI<T>(url: string, method: HTTP_METHOD): Promise<T> {
    let options = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        method
    }
    const result = await fetch(url, options)
        .then(async (value: Response) => {
            return await value.json();
        })
        .catch((error: unknown) => {
            throw error;
        });

    return result;
}