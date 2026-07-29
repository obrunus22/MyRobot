import { BrainContext } from "./BrainContext";
import { BrainStep } from "./pipeline/BrainStep";
import { Emotion } from "./types/Emotion";
import { Intent } from "./types/Intent";
import { CognitiveState } from "./cognitive/CognitiveState";

export interface BrainProcessingResult {
    context: BrainContext;
    cognitiveState: CognitiveState;
}

export class Brain {
    /**
     * Orquestrador da arquitetura modular.
     * Não contém lógica de negócio; apenas executa a pipeline de etapas.
     */
    constructor(
        private readonly pipeline: BrainStep[],
        private readonly cognitiveStateBuilder?: { build(context: BrainContext): Promise<CognitiveState> }
    ) {}

    async process(input: string): Promise<BrainProcessingResult> {
        const context: BrainContext = {
            rawInput: input,
            normalizedInput: input,
            language: "pt-BR",
            intent: Intent.UNKNOWN,
            entities: [],
            emotion: Emotion.NEUTRAL,
            topicId: "default",
            conversationId: "default",
            isContinuation: false,
            confidence: 0.5,
            metadata: {},
        };

        let currentContext = context;

        for (const step of this.pipeline) {
            currentContext = await step.execute(currentContext);
        }

        const cognitiveState = this.cognitiveStateBuilder
            ? await this.cognitiveStateBuilder.build(currentContext)
            : {
                requiredKnowledge: [],
                requiredTools: [],
                confidence: currentContext.confidence,
                reasoningHints: [],
                metadata: {},
            };

        return {
            context: currentContext,
            cognitiveState,
        };
    }
}
