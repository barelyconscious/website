import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { get } from "aws-amplify/api";
import "../../styles/board.css";
import { BoardSummary, TopicSummary, GetTopicsResponse, getBoard } from "../../models/forum";

async function getTopics(boardId: string, paginationToken?: string): Promise<GetTopicsResponse> {
    const queryParams: Record<string, string> = {};
    queryParams.boardId = boardId;
    if (paginationToken) {
        queryParams.paginationToken = paginationToken;
    }

    const res = await get({
        apiName: 'BCGamesServiceAPI',
        path: '/topics',
        options: {
            queryParams,
        }
    }).response;
    const response = await res.body.text();

    return JSON.parse(response || '{}');
}

const Board = () => {
    const { boardId } = useParams<{ boardId: string }>(); // Get board name from URL
    const [boardSummary, setBoardSummary] = useState<BoardSummary | undefined>(undefined);
    const [paginationToken, setPaginationToken] = useState<string | undefined>(undefined);
    const [topics, setTopics] = useState<TopicSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                if (!boardId) {
                    throw new Error("No board ID provided.");
                }

                setBoardSummary(await getBoard(boardId));

                // load first page of topics
                const res = await getTopics(boardId, paginationToken);
                setPaginationToken(res.paginationToken);
                setTopics(res.topics);
            } catch (err) {
                setError("Failed to load posts.");
                console.error("API Error:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, [boardId]);

    if (loading) return <p className="loading">Loading posts...</p>;
    if (error || boardSummary === undefined) return <p className="error">{error}</p>;

    return (
        <div className="board-container">
            <div className="topic-title-container">
                <Link to="/forum" className="topic-breadcrumb">&lt; Boards</Link>
                <span className="topic-title"> / {boardSummary.name} Topics</span>
            </div>
            
            <div className="board-topic-list">
                {topics.length > 0 ? (
                    topics.map((topic) => (
                        <Link key={topic.id} to={`/forum/${boardId}/${topic.id}`} className="board-topic-item topic-link">
                            <div>
                                <h2 className="board-topic-title">{topic.title}</h2>
                                <p className="board-topic-meta">
                                    By <Link to={`/profile/${topic.authorId}`} className="author-link">{topic.authorName}</Link> • {new Date(topic.createdAt).toLocaleString()}
                                </p>
                                <p className="board-topic-preview">{topic.contentPreview}...</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="no-board-topics">No posts yet. Be the first to post!</p>
                )}
            </div>
        </div>
    );
};

export default Board;
