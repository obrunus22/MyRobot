import { BrainContext } from "../BrainContext";
import { IEmotionAnalyzer } from "../interfaces/IEmotionAnalyzer";
import { BrainStep } from "./BrainStep";
import { Emotion } from "../types/Emotion";

export class EmotionAnalyzerStep implements BrainStep {
    /**
     * Analisa o tom emocional da mensagem.
     * Por enquanto, devolve um valor neutro para preservar a estabilidade do fluxo.
     */
    constructor(private readonly analyzer: IEmotionAnalyzer) {}

    async execute(context: BrainContext): Promise<BrainContext> {
        const emotion = await this.analyzer.analyze(context.normalizedInput);

        return {
            ...context,
            emotion,
        };
    }
}
