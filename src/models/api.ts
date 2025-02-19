import * as Auth from 'aws-amplify/auth';

export const bcgApi = async (path: string) => {
    const sesh = await Auth.fetchAuthSession();
    return {
        apiName: 'BCGamesServiceAPI',
        path,
        options: {
            headers: {
                'Authorization': `Bearer ${sesh.tokens?.accessToken}`,
            }
        }
    };
}
