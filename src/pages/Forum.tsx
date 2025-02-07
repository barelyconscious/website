import { useEffect, useState } from "react";
import { get } from "aws-amplify/api";
import '../styles/forum.css';

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
        <div className="forum-container">
            <h1>Community Forum</h1>
            <p className="forum-subtitle">Discuss cybernetic felines, biograms, and more.</p>
            <div className="board-list">
                {boards.map((board) => (
                    <div key={board.id} className="board-item">
                        <h2>{board.name}</h2>
                        <p>{board.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forum;
