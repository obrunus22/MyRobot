import { BrainContext } from "../BrainContext";
import { CognitiveState } from "./CognitiveState";

export interface ICognitiveModule {
    /**
     * Enriquece o estado cognitivo com uma visão específica do contexto atual.
     */
    execute(context: BrainContext, state: CognitiveState): Promise<CognitiveState>;
}
