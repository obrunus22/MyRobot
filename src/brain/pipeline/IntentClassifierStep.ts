import { BrainContext } from "../BrainContext";
import { BrainStep } from "./BrainStep";
import { Intent } from "../types/Intent";
import { AnalysisEngine } from "../analysis/AnalysisEngine";
import { IntentAnalysisTask } from "../analysis/tasks/IntentAnalysisTask";

export class IntentClassifierStep implements BrainStep {
    /**
     * Etapa responsável por classificar a intenção da mensagem usando o AnalysisEngine.
     * Mantém-se focada apenas em aplicar o resultado ao contexto.
     */
    constructor(private readonly analysisEngine: AnalysisEngine) {}

    async execute(context: BrainContext): Promise<BrainContext> {
        try {
            const result = await this.analysisEngine.execute(
                new IntentAnalysisTask(),
                context.normalizedInput
            );

            if (result.success && result.data) {
                return {
                    ...context,
                    intent: result.data.intent,
                    confidence: result.data.confidence,
                };
            }

            console.error("Falha ao classificar intenção:", result.errors);
            return {
                ...context,
                intent: Intent.UNKNOWN,
                confidence: 0,
            };
        } catch (error) {
            console.error("Falha inesperada ao classificar intenção:", error);
            return {
                ...context,
                intent: Intent.UNKNOWN,
                confidence: 0,
            };
        }
    }
}
