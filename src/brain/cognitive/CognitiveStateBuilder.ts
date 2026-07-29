import { BrainContext } from "../BrainContext";
import { CognitiveState } from "./CognitiveState";
import { ICognitiveModule } from "./ICognitiveModule";

export class CognitiveStateBuilder {
    /**
     * Orquestra a construção do estado cognitivo executando todos os módulos registrados.
     * Não possui regras de negócio; apenas coordena.
     */
    constructor(private readonly modules: ICognitiveModule[]) {}

    async build(context: BrainContext): Promise<CognitiveState> {
        const state: CognitiveState = {
            requiredKnowledge: [],
            requiredTools: [],
            confidence: context.confidence,
            reasoningHints: [],
            metadata: {
                conversationId: context.conversationId,
                topicId: context.topicId,
                language: context.language,
            },
        };

        let currentState = state;

        for (const module of this.modules) {
            try {
                currentState = await module.execute(context, currentState);
            } catch (error) {
                console.error("Falha ao executar módulo cognitivo:", error);
            }
        }

        return currentState;
    }
}
