import { BrainContext } from "../../BrainContext";
import { AnalysisEngine } from "../../analysis/AnalysisEngine";
import { CognitiveState } from "../CognitiveState";
import { ICognitiveModule } from "../ICognitiveModule";
import { GoalAnalysisTask } from "../tasks/GoalAnalysisTask";

export class GoalModule implements ICognitiveModule {
    /**
     * Descobre o objetivo principal do usuário a partir do contexto atual.
     */
    constructor(private readonly analysisEngine: AnalysisEngine) {}

    async execute(context: BrainContext, state: CognitiveState): Promise<CognitiveState> {
        const result = await this.analysisEngine.execute(new GoalAnalysisTask(), context.normalizedInput);

        if (result.success && result.data) {
            return {
                ...state,
                goal: result.data.goal,
                confidence: Math.max(state.confidence, result.data.confidence),
                reasoningHints: [...state.reasoningHints, `Objetivo detectado: ${result.data.goal}`],
            };
        }

        return {
            ...state,
            reasoningHints: [...state.reasoningHints, "Não foi possível inferir o objetivo com confiança."],
        };
    }
}
