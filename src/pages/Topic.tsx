import { useEffect, useState } from 'react';
import { get } from 'aws-amplify/api';
import { Link, useParams } from 'react-router-dom';
import { BoardSummary, GetPostsResponse, Post, getBoard } from '../models/forum';

async function getPosts(topicId: string, paginationToken?: string): Promise<GetPostsResponse> {
    const queryParams: Record<string, string> = {};
    queryParams.topicId = topicId;
    if (paginationToken) {
        queryParams.paginationToken = paginationToken;
    }

    const res = await get({
        apiName: 'BCGamesServiceAPI',
        path: '/posts',
        options: { queryParams }
    }).response;
    const response = await res.body.text();
    return JSON.parse(response || '{ "posts": [] }');
}

const Topic = () => {
    const { boardId, topicId } = useParams<{ boardId: string, topicId: string }>();
    const [board, setBoard] = useState<BoardSummary | undefined>(undefined);
    const [posts, setPosts] = useState<Post[]>([]);
    const [paginationToken, setPaginationToken] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                if (!topicId || !boardId) {
                    throw new Error("No topic ID provided.");
                }

                setBoard(await getBoard(boardId));

                const postsResponse = await getPosts(topicId, paginationToken);
                setPaginationToken(postsResponse.paginationToken);
                setPosts(postsResponse.posts);
            } catch (err) {
                setError("Failed to load posts");
                console.error("API Error:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, [paginationToken]);

    if (loading) return <p className='loading'>Loading posts...</p>;
    if (error) return <p className='error'>{error}</p>;

    return (
        <div className='topic-container'>
            <Link to={`/forum/${boardId}`} className='back-link'>Back to board</Link>
            {posts.map((post) => (
                <div key={post.id} className='post'>
                    <h3>{post.authorName}</h3>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    )
};

export default Topic;
