import { ChatMessage } from "../llm/ollamaProvider";
import { Planner } from "./Planner";
import { Executor } from "./Executor";
import { createDefaultBrain } from "../brain/pipeline/DefaultPipeline";
import { Brain as ModularBrain } from "../brain/Brain";

export class Brain {
    private readonly modularBrain: ModularBrain;

    constructor(
        private planner: Planner,
        private executor: Executor,
        modularBrain?: ModularBrain
    ) {
        this.modularBrain = modularBrain ?? createDefaultBrain();
    }

    async think(messages: ChatMessage[]): Promise<string> {
        const lastMessage = messages.at(-1);

        if (!lastMessage) {
            throw new Error("Nenhuma mensagem enviada.");
        }

        const processingResult = await this.modularBrain.process(lastMessage.content);
        const { context } = processingResult;

        const enrichedMessages: ChatMessage[] = [
            {
                role: "system",
                content: [
                    "Contexto modular do agente:",
                    `- intent: ${context.intent}`,
                    `- emotion: ${context.emotion}`,
                    `- topicId: ${context.topicId}`,
                    `- entities: ${context.entities.map((entity: { type: string; value: string }) => `${entity.type}:${entity.value}`).join(", ") || "nenhuma"}`,
                    `- confidence: ${context.confidence}`,
                    `- goal: ${processingResult.cognitiveState.goal ?? "não inferido"}`,
                    `- subject: ${processingResult.cognitiveState.subject ?? "não inferido"}`,
                    `- requiredKnowledge: ${processingResult.cognitiveState.requiredKnowledge.join(", ") || "nenhum"}`,
                    `- requiredTools: ${processingResult.cognitiveState.requiredTools.join(",") || "nenhuma"}`,
                ].join("\n"),
            },
            ...messages,
        ];

        const plan = await this.planner.plan(enrichedMessages);

        return this.executor.execute(plan, enrichedMessages);
    }
}