import { post } from 'aws-amplify/api';

export type User = {
    username: string;
}

export type SignUpResponse = {
    isSuccess: boolean;
    errorMessage: string;
}

export type SignInResponse = {
    isSuccess: boolean;
    errorMessage: string;
    username: string;
    idToken: string;
    accessToken: string;
    refreshToken: string;
}

export async function signUpUser(username: string, password: string): Promise<SignUpResponse> {
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
    return JSON.parse(response || '{ isSuccess: false, errorMessage: "unknown error" }');
}

export async function signInUser(username: string, password: string): Promise<SignInResponse> {
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
    return JSON.parse(response || '{ isSuccess: false, errorMessage: "unknown error" }');
}

export async function signOutUser() {
    console.log('Someone was supposed to implement signOutUser');
}
