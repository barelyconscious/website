import { FaMicrophone } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { get } from 'aws-amplify/api';
import { Link, useParams } from 'react-router-dom';
import { BoardSummary, TopicSummary, GetPostsResponse, Post, getBoard, getTopic } from '../models/forum';
import '../styles/topic.css';
import NewReply from '../components/Forum/NewReply';

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
    const [topic, setTopic] = useState<TopicSummary | undefined>(undefined);
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
                setTopic(await getTopic(topicId));

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
    if (error || !board || !topic) return <p className='error'>{error}</p>;

    return (
        <div className='topic-container'>
            <div className="topic-title-container">
                <Link to={`/forum/${boardId}`} className="topic-breadcrumb">&lt; {board.name}</Link>
                <span className="topic-title"> / {topic.title}</span>
            </div>

            <div className="post-list">
                {posts.map((post) => (
                    <div key={post.id} className='post-item'>
                        <div className="post-author-container">
                            <div className="author-avatar"></div>
                            <span className="post-author">
                                {post.authorName}
                                {post.authorId === topic.authorId && (
                                    <span className='op-icon'>
                                        <FaMicrophone title='Original Poster' />
                                    </span>
                                )}
                            </span>
                            <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>

                        <div className="post-content">{post.content}</div>
                    </div>
                ))}
            </div>

            <NewReply onSubmit={(content) => {
                // go ahead and add the post to the list assuming it will succeed
                setPosts([...posts, { id: 'new', content, authorId: 'me', authorName: 'Me', createdAt: new Date().toISOString() }]);
                // next, actually publish the new post
            }} />

            {paginationToken && (
                <button className="load-more" onClick={() => setPaginationToken(paginationToken)}>
                    Load More Posts
                </button>
            )}
        </div>
    )
};

export default Topic;
