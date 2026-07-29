import { IEmotionAnalyzer } from "../brain/interfaces/IEmotionAnalyzer";
import { Emotion } from "../brain/types/Emotion";

export class DefaultEmotionAnalyzer implements IEmotionAnalyzer {
    analyze(input: string): Emotion {
        const normalized = input.toLowerCase();

        if (normalized.includes("urgente") || normalized.includes("preciso") || normalized.includes("agora")) {
            return Emotion.URGENT;
        }

        if (normalized.includes("!")) {
            return Emotion.FRUSTRATED;
        }

        if (normalized.includes("?")) {
            return Emotion.CURIOUS;
        }

        return Emotion.NEUTRAL;
    }
}
