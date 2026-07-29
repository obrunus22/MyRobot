import { Emotion } from "../types/Emotion";

export interface IEmotionAnalyzer {
    analyze(input: string): Promise<Emotion> | Emotion;
}
