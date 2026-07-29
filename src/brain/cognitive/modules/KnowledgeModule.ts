import { BrainContext } from "../../BrainContext";
import { AnalysisEngine } from "../../analysis/AnalysisEngine";
import { CognitiveState } from "../CognitiveState";
import { ICognitiveModule } from "../ICognitiveModule";
import { KnowledgeAnalysisTask } from "../tasks/KnowledgeAnalysisTask";

export class KnowledgeModule implements ICognitiveModule {
    /**
     * Sugere o conjunto de conhecimentos que o agente precisará consultar.
     */
    constructor(private readonly analysisEngine: AnalysisEngine) {}

    async execute(context: BrainContext, state: CognitiveState): Promise<CognitiveState> {
        const result = await this.analysisEngine.execute(new KnowledgeAnalysisTask(), context.normalizedInput);

        if (result.success && result.data) {
            return {
                ...state,
                requiredKnowledge: [...new Set([...state.requiredKnowledge, ...result.data.requiredKnowledge])],
                confidence: Math.max(state.confidence, result.data.confidence),
                reasoningHints: [...state.reasoningHints, `Conhecimentos sugeridos: ${result.data.requiredKnowledge.join(", ")}`],
            };
        }

        return state;
    }
}
