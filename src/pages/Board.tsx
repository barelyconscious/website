import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "aws-amplify/api";
import "../styles/board.css";

type Post = {
    id: number;
    title: string;
    author: string;
    content: string;
    createdAt: string;
};

type GetBoardResponse = {
    boardId: string;
    boardName: string;
    posts: Post[];
}

const Board = () => {
    const { boardName } = useParams<{ boardName: string }>(); // Get board name from URL
    const [board, setPosts] = useState<GetBoardResponse | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await get({
                    apiName: 'BCGamesServiceAPI',
                    path: '/boards/' + boardName,
                }).response;
                const response = await res.body.text();
                setPosts(JSON.parse(response || '[]'));
            } catch (err) {
                setError("Failed to load posts.");
                console.error("API Error:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, [boardName]);

    if (loading) return <p className="loading">Loading posts...</p>;
    if (error || board === undefined) return <p className="error">{error}</p>;

    return (
        <div className="board-container">
            <h1>{board.boardName}</h1>
            <div className="post-list">
                {board.posts.length > 0 ? (
                    board.posts.map((post) => (
                        <div key={post.id} className="post-item">
                            <h2 className="post-title">{post.title}</h2>
                            <p className="post-meta">
                                By <strong>{post.author}</strong> • {new Date(post.createdAt).toLocaleString()}
                            </p>
                            <p className="post-preview">{post.content && post.content.slice(0, 100)}...</p>
                        </div>
                    ))
                ) : (
                    <p className="no-posts">No posts yet. Be the first to post!</p>
                )}
            </div>
        </div>
    );
};

export default Board;
