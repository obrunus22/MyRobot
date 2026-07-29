import { BrainContext } from "../../BrainContext";
import { AnalysisEngine } from "../../analysis/AnalysisEngine";
import { CognitiveState } from "../CognitiveState";
import { ICognitiveModule } from "../ICognitiveModule";
import { SubjectAnalysisTask } from "../tasks/SubjectAnalysisTask";

export class SubjectModule implements ICognitiveModule {
    /**
     * Identifica o assunto principal da conversa.
     */
    constructor(private readonly analysisEngine: AnalysisEngine) {}

    async execute(context: BrainContext, state: CognitiveState): Promise<CognitiveState> {
        const result = await this.analysisEngine.execute(new SubjectAnalysisTask(), context.normalizedInput);

        if (result.success && result.data) {
            return {
                ...state,
                subject: result.data.subject,
                currentTopic: result.data.subject,
                confidence: Math.max(state.confidence, result.data.confidence),
                reasoningHints: [...state.reasoningHints, `Assunto detectado: ${result.data.subject}`],
            };
        }

        return state;
    }
}
