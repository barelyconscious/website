import * as Auth from 'aws-amplify/auth';
import { get } from 'aws-amplify/api';

export type BoardSummary = {
    id: string;
    path: string;
    name: string;
    description: string;
    numTopics: number;
    numPosts: number;
    recentTopic: TopicSummary;
}

export type TopicSummary = {
    id: string;
    title: string;
    authorId: string;
    authorName: string;
    createdAt: string;
    lastUpdatedAt: string;
    contentPreview: string;
}

export type Post = {
    id: string;
    authorId: string;
    authorName: string;
    createdAt: string;
    content: string;
}

export type GetTopicsResponse = {
    topics: TopicSummary[];
    paginationToken: string | undefined;
}

export type GetPostsResponse = {
    posts: Post[];
    paginationToken: string | undefined;
}

export async function getBoards(): Promise<BoardSummary[]> {
    const sesh = await Auth.fetchAuthSession();
    const res = await get({
        apiName: 'BCGamesServiceAPI',
        path: '/forum',
        options: {
            headers: {
                'Authorization': `Bearer ${sesh.tokens?.accessToken}`
            }
        }
    }).response;
    const json = await res.body.text();
    return JSON.parse(json || '{ "boards": [] }').boards;
}

export async function getBoard(boardId: string): Promise<BoardSummary> {
    const res = await get({
        apiName: 'BCGamesServiceAPI',
        path: '/boards/' + boardId,
    }).response;
    const response = await res.body.text();

    return JSON.parse(response || '{ "name": "Unknown Board" }');
}

export async function getTopic(topicId: string): Promise<TopicSummary> {
    const res = await get({
        apiName: 'BCGamesServiceAPI',
        path: '/topic/' + topicId,
    }).response;
    const response = await res.body.text();

    return JSON.parse(response || '{ "title": "Unknown topic" }');
}
