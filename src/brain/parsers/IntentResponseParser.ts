import { Intent } from "../types/Intent";
import { IntentAnalysis } from "../models/IntentAnalysis";

export class IntentResponseParser {
    /**
     * Converte a resposta textual do modelo em um objeto de análise de intenção.
     * É resiliente a pequenas variações e falhas de formatação.
     */
    parse(response: string): IntentAnalysis {
        const cleaned = this.extractJson(response);

        try {
            const parsed = JSON.parse(cleaned) as Partial<IntentAnalysis>;

            const intentValue = typeof parsed.intent === "string" ? parsed.intent.toUpperCase() : "";
            const confidence = typeof parsed.confidence === "number" ? parsed.confidence : NaN;

            if (!Object.values(Intent).includes(intentValue as Intent)) {
                throw new Error(`Intent inválida: ${parsed.intent}`);
            }

            if (!Number.isFinite(confidence) || confidence < 0 || confidence > 1) {
                throw new Error(`Confidence inválida: ${parsed.confidence}`);
            }

            return {
                intent: intentValue as Intent,
                confidence,
            };
        } catch (error) {
            throw new Error(`Falha ao interpretar a intenção do modelo: ${(error as Error).message}`);
        }
    }

    private extractJson(response: string): string {
        const normalized = response.trim();

        if (!normalized) {
            throw new Error("Resposta vazia do modelo.");
        }

        const fenced = normalized.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
        if (fenced?.[1]) {
            return fenced[1].trim();
        }

        const start = normalized.indexOf("{");
        const end = normalized.lastIndexOf("}");

        if (start >= 0 && end > start) {
            return normalized.slice(start, end + 1).trim();
        }

        throw new Error("Nenhum JSON válido foi encontrado na resposta do modelo.");
    }
}
