import * as Auth from 'aws-amplify/auth';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { get } from "aws-amplify/api";
import "../../styles/board.css";
import "../../styles/createTopic.css"; // New modal styles
import { BoardSummary, getBoard } from "../../models/forum";
import { GetTopicsResponse, TopicSummary } from "../../models/topics";
import CreateTopicModal from "../../components/Forum/CreateTopicModal"; // Import new modal component

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
    const { boardId } = useParams<{ boardId: string }>();
    const [boardSummary, setBoardSummary] = useState<BoardSummary | undefined>(undefined);
    const [paginationToken, setPaginationToken] = useState<string | undefined>(undefined);
    const [topics, setTopics] = useState<TopicSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal state
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    useEffect(() => {
        async function fetchPosts() {
            try {
                if (!boardId) {
                    throw new Error("No board ID provided.");
                }

                setBoardSummary(await getBoard(boardId));
                try {
                    await Auth.getCurrentUser();
                    setUserLoggedIn(true);
                } catch (e) {
                    setUserLoggedIn(false);
                }

                // Load first page of topics
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
                {userLoggedIn && <button className="board-button create-topic-button" onClick={() => setIsModalOpen(true)}>
                    New Topic
                </button>}
            </div>

            <p></p>
            <div className="board-topic-list">
                {topics.length > 0 ? (
                    topics.map((topic) => (
                        <Link key={topic.id} to={`/forum/${boardId}/${topic.id}`} className="board-topic-item topic-link">
                            <div>
                                <div className="topic-stats">
                                    <p>11 posts</p>
                                    <p>Updated 5 min. ago</p>
                                </div>
                                <h2 className="board-topic-title">{topic.title}</h2>
                                <p className="board-topic-meta">
                                    By <Link to={`/profile/${topic.authorName}`} className="author-link">{topic.authorName}</Link> • {new Date(topic.createdAt).toLocaleString()}
                                </p>
                                <p className="board-topic-preview">{topic.contentPreview}...</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="no-board-topics">No posts yet. Be the first to post!</p>
                )}
            </div>

            {isModalOpen && <CreateTopicModal boardId={boardId!!} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default Board;
