'use server'
import { HTTP_METHOD } from "../type/http.type";
import { InputFormType } from "../modals/inputFormType";


export async function broadcastAPI<T>(url: string, requestBody: InputFormType, method: HTTP_METHOD): Promise<T> {
    let options = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        method
    }
    options = Object.assign(options, {
        body: JSON.stringify(requestBody),
    });

    const result = await fetch(url, options)
        .then(async (value: Response) => {
            return await value.json();
        })
        .catch((error: unknown) => {
            throw error;
        });

    return result;
}