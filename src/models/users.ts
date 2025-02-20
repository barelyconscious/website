import { get, post } from 'aws-amplify/api';
import { bcgApi } from './api';

export type SignUpResponse = {
    isSuccess: boolean;
    errorMessage: string;
}

export type ProfileResponse = {
    username: string;
    email?: string;
    isEmailVerified: boolean;
    dateJoined: string;
    signature?: string;
    avatarUrl?: string;
    numPosts: number;
    numTopics: number;
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

export const getProfile = async (userId: string): Promise<ProfileResponse> => {
    const res = await get(await bcgApi('/profile/' + userId)).response;
    const response = await res.body.text();
    return JSON.parse(response || '{ }');
};
