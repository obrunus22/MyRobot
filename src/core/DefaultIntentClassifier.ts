import { IIntentClassifier } from "../brain/interfaces/IIntentClassifier";
import { Intent } from "../brain/types/Intent";

export class DefaultIntentClassifier implements IIntentClassifier {
    classify(input: string): Intent {
        const normalized = input.toLowerCase();

        if (normalized.includes("olá") || normalized.includes("oi") || normalized.includes("bom dia")) {
            return Intent.GREETING;
        }

        if (normalized.includes("como") || normalized.includes("o que") || normalized.includes("por que")) {
            return Intent.QUESTION;
        }

        if (normalized.includes("crie") || normalized.includes("criar") || normalized.includes("gere")) {
            return Intent.CREATION;
        }

        if (normalized.includes("planejar") || normalized.includes("plano") || normalized.includes("estratégia")) {
            return Intent.PLANNING;
        }

        if (normalized.includes("program") || normalized.includes("código") || normalized.includes("typescript")) {
            return Intent.PROGRAMMING;
        }

        return Intent.UNKNOWN;
    }
}
