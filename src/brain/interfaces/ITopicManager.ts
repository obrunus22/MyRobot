export interface ITopicManager {
    resolveTopic(input: string, context: { conversationId: string; topicId: string }): Promise<string> | string;
}
