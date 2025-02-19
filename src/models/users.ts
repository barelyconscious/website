import { post } from 'aws-amplify/api';

export type SignUpResponse = {
    isSuccess: boolean;
    errorMessage: string;
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
