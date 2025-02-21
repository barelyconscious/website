import { get, post } from "aws-amplify/api";
import { bcgApi } from "./api";

export type TopicSummary = {
    id: string;
    title: string;
    authorId: string;
    authorName: string;
    createdAt: string;
    lastUpdatedAt: string;
    contentPreview: string;
}

export type CreateTopicRequest = {
    boardId: number;
    title: string;
    content: string;
}

export type CreateTopicResponse = {
    topicId: number;
}

export type GetTopicsResponse = {
    topics: TopicSummary[];
    paginationToken: string | undefined;
}

export type Post = {
    id: string;
    authorId: string;
    authorName: string;
    createdAt: string;
    content: string;
}

export type GetPostsResponse = {
    posts: Post[];
    paginationToken: string | undefined;
}

export async function getTopicSummary(topicId: string): Promise<TopicSummary> {
    const res = await get(await bcgApi('/topic/' + topicId)).response;
    const response = await res.body.text();

    return JSON.parse(response || '{ "title": "Unknown topic" }');
}


export const getTopics = async (boardId: number): Promise<GetTopicsResponse> => {
    const res = await get(await bcgApi(`/boards/${boardId}`)).response;
    const json = await res.body.text();
    return JSON.parse(json || '{ "topics": [], "paginationToken": undefined }');
}

export const createTopic = async (request: CreateTopicRequest): Promise<CreateTopicResponse> => {
    const res = await post(await bcgApi('/topic', {
        boardId: request.boardId,
        title: request.title,
        content: request.content,
    })).response;
    const json = await res.body.text();
    return JSON.parse(json || '{}');
}
