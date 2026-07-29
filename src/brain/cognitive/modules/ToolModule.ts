import { BrainContext } from "../../BrainContext";
import { AnalysisEngine } from "../../analysis/AnalysisEngine";
import { CognitiveState } from "../CognitiveState";
import { ICognitiveModule } from "../ICognitiveModule";
import { ToolAnalysisTask } from "../tasks/ToolAnalysisTask";

export class ToolModule implements ICognitiveModule {
    /**
     * Sugere ferramentas que podem ser necessárias para resolver a solicitação.
     */
    constructor(private readonly analysisEngine: AnalysisEngine) {}

    async execute(context: BrainContext, state: CognitiveState): Promise<CognitiveState> {
        const result = await this.analysisEngine.execute(new ToolAnalysisTask(), context.normalizedInput);

        if (result.success && result.data) {
            return {
                ...state,
                requiredTools: [...new Set([...state.requiredTools, ...result.data.requiredTools])],
                confidence: Math.max(state.confidence, result.data.confidence),
                reasoningHints: [...state.reasoningHints, `Ferramentas sugeridas: ${result.data.requiredTools.join(", ")}`],
            };
        }

        return state;
    }
}
