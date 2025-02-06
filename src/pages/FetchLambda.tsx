import { useEffect, useState } from 'react';
import { get } from 'aws-amplify/api';

const FetchLambda = () => {
    const [message, setMessage] = useState("Loading...");

    useEffect(() => {
        async function fetchMessage() {
            try {
                const res = await get({
                    apiName: 'BCGamesServiceAPI',
                    path: '/forum',
                }).response;
                setMessage(await res.body.text());
            } catch (e) {
                setMessage(`Error: ${e}`);
                console.error('API Error:', e);
            }
        }
        fetchMessage();
    }, []);

    return (
        <div>
            <h1>Lambda says:</h1>
            <p>{message}</p>
        </div>
    )
}

export default FetchLambda;
