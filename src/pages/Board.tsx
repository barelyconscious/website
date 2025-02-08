import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "aws-amplify/api";
import "../styles/board.css";

type Topic = {
    id: number;
    title: string;
    posts: number;
};

const Board = () => {
    const { boardName } = useParams<{ boardName: string }>(); // Get the board name from URL
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTopics() {
            try {
                const res = await get({
                    apiName: 'BCGamesServiceAPI',
                    path: '/boards/' + boardName,
                }).response;
                const json = await res.body.text();
                setTopics(JSON.parse(json || '[]'));
            } catch (err) {
                setError("Failed to load topics.");
                console.error("API Error:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchTopics();
    }, [boardName]);

    if (loading) return <p className="loading">Loading topics...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="board-container">
            <h1>{boardName && decodeURIComponent(boardName.replace("-", " "))}</h1>
            <div className="topic-list">
                {topics.map((topic) => (
                    <div key={topic.id} className="topic-item">
                        <h2>{topic.title}</h2>
                        <p>{topic.posts} Posts</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Board;
