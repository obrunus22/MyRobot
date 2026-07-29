import { AnalysisTask } from "../../analysis/tasks/AnalysisTask";

export interface KnowledgeAnalysis {
    requiredKnowledge: string[];
    confidence: number;
}

export class KnowledgeAnalysisTask implements AnalysisTask<KnowledgeAnalysis> {
    description = "Liste os conhecimentos necessários para responder à solicitação.";
    expectedShape = '{"requiredKnowledge":["Raspberry Pi","GPIO"],"confidence":0.9}';
    requiredFields: Array<keyof KnowledgeAnalysis> = ["requiredKnowledge", "confidence"];

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

    validate(result: unknown): KnowledgeAnalysis {
        if (!result || typeof result !== "object" || Array.isArray(result)) {
            throw new Error("O resultado da análise de conhecimento deve ser um objeto.");
        }

        const payload = result as Record<string, unknown>;
        const requiredKnowledge = Array.isArray(payload.requiredKnowledge)
            ? payload.requiredKnowledge.filter((item): item is string => typeof item === "string")
            : [];
        const confidence = typeof payload.confidence === "number" ? payload.confidence : NaN;

        if (!requiredKnowledge.length) {
            throw new Error("Nenhum conhecimento identificado.");
        }

        if (!Number.isFinite(confidence) || confidence < 0 || confidence > 1) {
            throw new Error("Confidence inválida.");
        }

        return { requiredKnowledge, confidence };
    }
}
