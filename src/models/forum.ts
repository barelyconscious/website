export type TopicSummary = {
    id: string;
    title: string;
    authorId: string;
    authorName: string;
    createdAt: string;
    lastUpdatedAt: string;
    contentPreview: string;
}

export type BoardSummary = {
    id: string;
    path: string;
    name: string;
    description: string;
    numTopics: number;
    numPosts: number;
    recentTopic: TopicSummary;
}

export type GetTopicsResponse = {
    topics: TopicSummary[];
    paginationToken: string | undefined;
}
