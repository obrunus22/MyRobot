import { Intent } from "../types/Intent";

export interface IIntentClassifier {
    classify(input: string): Promise<Intent> | Intent;
}
