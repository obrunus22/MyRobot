import { ITopicManager } from "../brain/interfaces/ITopicManager";

export class DefaultTopicManager implements ITopicManager {
    resolveTopic(input: string, context: { conversationId: string; topicId: string }): string {
        if (!input.trim()) {
            return context.topicId;
        }

        return context.conversationId === "default" ? "default" : context.topicId;
    }
}
