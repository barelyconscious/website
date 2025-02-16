import { post } from 'aws-amplify/api';

export type SignUpResponse = {
    isSuccess: boolean;
    errorMessage: string;
}

export async function signUpUser(username: string, password: string) {
    const res = await post({
        apiName: 'BCGamesServiceAPI',
        path: '/signup',
        options: {
            body: {
                username,
                password
            }
        }
    }).response;
    const response = await res.body.text();
    return JSON.parse(response || '{ isSuccessful: false, errorMessage: "unknown error" }');
}

export async function signInUser(username: string, password: string) {
    const res = await post({
        apiName: 'BCGamesServiceAPI',
        path: '/signin',
        options: {
            body: {
                username,
                password
            }
        }
    }).response;
    const response = await res.body.text();
    return JSON.parse(response || '{ isSuccessful: false, errorMessage: "unknown error" }');
}
