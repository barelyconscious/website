import * as Auth from 'aws-amplify/auth';

export const bcgApi = async (path: string, body?: any) => {
    const sesh = await Auth.fetchAuthSession();
    return {
        apiName: 'BCGamesServiceAPI',
        path,
        options: {
            headers: {
                'Authorization': `Bearer ${sesh.tokens?.accessToken}`,
            },
            body,
        }
    };
}
