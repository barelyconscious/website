import { useEffect, useState } from "react";
import { get } from "aws-amplify/api";

type Board = {
    id: number;
    name: string;
    description: string;
};

const Forum = () => {
    const [boards, setBoards] = useState<Board[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchBoards() {
            try {
                const res = await get({
                    apiName: 'BCGamesServiceAPI',
                    path: '/forum', // maybe /boards later
                }).response;
                const json = await res.body.text();
                setBoards(JSON.parse(json || '[]'));
            } catch (err) {
                setError("Failed to load boards.");
                console.error("API Error:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchBoards();
    }, []);

    if (loading) return <p>Loading boards...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Forum Boards</h1>
            <ul>
                {boards.map((board) => (
                    <li key={board.id}>
                        <h2>{board.name}</h2>
                        <p>{board.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Forum;
