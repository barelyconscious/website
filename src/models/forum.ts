import { get } from 'aws-amplify/api';
import { bcgApi } from './api';

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
    const res = await get(await bcgApi('/forum')).response;
    const json = await res.body.text();
    return JSON.parse(json || '{ "boards": [] }').boards;
}

export async function getBoard(boardId: string): Promise<BoardSummary> {
    const res = await get(await bcgApi('/boards/' + boardId)).response;
    const response = await res.body.text();

    return JSON.parse(response || '{ "name": "Unknown Board" }');
}

export async function getTopic(topicId: string): Promise<TopicSummary> {
    const res = await get(await bcgApi('/topic/' + topicId)).response;
    const response = await res.body.text();

    return JSON.parse(response || '{ "title": "Unknown topic" }');
}
