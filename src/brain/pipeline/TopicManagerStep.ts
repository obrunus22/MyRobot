import { BrainContext } from "../BrainContext";
import { ITopicManager } from "../interfaces/ITopicManager";
import { BrainStep } from "./BrainStep";

export class TopicManagerStep implements BrainStep {
    /**
     * Gerencia o tópico da conversa.
     * A implementação futura consultará memória para decidir se a mensagem pertence ao tópico atual.
     */
    constructor(private readonly topicManager: ITopicManager) {}

    async execute(context: BrainContext): Promise<BrainContext> {
        const topicId = await this.topicManager.resolveTopic(context.normalizedInput, {
            conversationId: context.conversationId,
            topicId: context.topicId,
        });

        return {
            ...context,
            topicId,
        };
    }
}
