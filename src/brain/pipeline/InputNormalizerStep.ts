import { BrainContext } from "../BrainContext";
import { BrainStep } from "./BrainStep";

export class InputNormalizerStep implements BrainStep {
    /**
     * Normaliza a entrada textual antes de qualquer análise posterior.
     * Esta etapa não usa IA e mantém a responsabilidade bem definida.
     */
    async execute(context: BrainContext): Promise<BrainContext> {
        const normalizedInput = context.rawInput
            .replace(/\s+/g, " ")
            .trim()
            .replace(/[\u200B-\u200D\u2060]/g, "");

        return {
            ...context,
            normalizedInput,
        };
    }
}
