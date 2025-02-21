import { get } from 'aws-amplify/api';
import { bcgApi } from './api';
import { TopicSummary } from './topics';

export type BoardSummary = {
    id: string;
    path: string;
    name: string;
    description: string;
    numTopics: number;
    numPosts: number;
    recentTopic: TopicSummary;
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
