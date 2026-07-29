import { Intent } from "../../types/Intent";
import { IntentAnalysis } from "../../models/IntentAnalysis";
import { AnalysisTask } from "./AnalysisTask";

export class IntentAnalysisTask implements AnalysisTask<IntentAnalysis> {
    description = "Classifique a intenção do texto do usuário.";
    expectedShape = '{"intent":"QUESTION","confidence":0.98}';
    requiredFields: Array<keyof IntentAnalysis> = ["intent", "confidence"];

    buildPrompt(input: string): string {
        const allowedIntents = Object.values(Intent).join(", ");

        return [
            this.description,
            "Responda SOMENTE com um objeto JSON válido.",
            "Não inclua markdown, explicações, comentários ou texto adicional.",
            `Os valores possíveis para intent são: ${allowedIntents}.`,
            "Formato esperado:",
            this.expectedShape,
            "",
            `Texto do usuário:\n${input}`,
        ].join("\n");
    }

    validate(result: unknown): IntentAnalysis {
        if (!result || typeof result !== "object" || Array.isArray(result)) {
            throw new Error("O resultado da análise deve ser um objeto.");
        }

        const payload = result as Record<string, unknown>;
        const intentValue = typeof payload.intent === "string" ? payload.intent.toUpperCase() : "";
        const confidence = typeof payload.confidence === "number" ? payload.confidence : NaN;

        if (!Object.values(Intent).includes(intentValue as Intent)) {
            throw new Error(`Intent inválida: ${payload.intent}`);
        }

        if (!Number.isFinite(confidence) || confidence < 0 || confidence > 1) {
            throw new Error(`Confidence inválida: ${payload.confidence}`);
        }

        return {
            intent: intentValue as Intent,
            confidence,
        };
    }
}
