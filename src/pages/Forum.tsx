import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get } from "aws-amplify/api";
import '../styles/forum.css';

type Board = {
    id: number;
    path: string;
    name: string;
    description: string;
    numTopics: number;
    numPosts: number;
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
            <h1>💾 Script Kitties Forum</h1>
            <p className="forum-subtitle">Discuss cybernetic felines, biograms, and more.</p>
            <div className="board-list">
                {boards.map((board) => (
                    <Link key={board.id} to={`/forum/${board.path}`} className="board-link">
                        <div className="board-item">
                            <div className="board-info">
                                <h2>{board.name}</h2>
                                <p>{board.description}</p>
                            </div>
                            <div className="board-stats">
                                <div className="stats-topics">
                                    <span>{board.numTopics}</span>
                                    <small>Topics</small>
                                </div>
                                <div className="stats-divider"></div>
                                <div className="stats-posts">
                                    <span>{board.numPosts}</span>
                                    <small>Posts</small>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Forum;
