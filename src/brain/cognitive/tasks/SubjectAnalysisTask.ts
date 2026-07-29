import { AnalysisTask } from "../../analysis/tasks/AnalysisTask";

export interface SubjectAnalysis {
    subject: string;
    confidence: number;
}

export class SubjectAnalysisTask implements AnalysisTask<SubjectAnalysis> {
    description = "Descubra o assunto principal da conversa.";
    expectedShape = '{"subject":"Robótica","confidence":0.94}';
    requiredFields: Array<keyof SubjectAnalysis> = ["subject", "confidence"];

    buildPrompt(input: string): string {
        return [
            this.description,
            "Responda somente com JSON válido.",
            "Não inclua markdown ou explicações.",
            this.expectedShape,
            "",
            `Texto do usuário:\n${input}`,
        ].join("\n");
    }

    validate(result: unknown): SubjectAnalysis {
        if (!result || typeof result !== "object" || Array.isArray(result)) {
            throw new Error("O resultado da análise de assunto deve ser um objeto.");
        }

        const payload = result as Record<string, unknown>;
        const subject = typeof payload.subject === "string" ? payload.subject.trim() : "";
        const confidence = typeof payload.confidence === "number" ? payload.confidence : NaN;

        if (!subject) {
            throw new Error("Assunto vazio.");
        }

        if (!Number.isFinite(confidence) || confidence < 0 || confidence > 1) {
            throw new Error("Confidence inválida.");
        }

        return { subject, confidence };
    }
}
