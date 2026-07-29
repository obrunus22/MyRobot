import { AnalysisTask } from "../../analysis/tasks/AnalysisTask";

export interface ToolAnalysis {
    requiredTools: string[];
    confidence: number;
}

export class ToolAnalysisTask implements AnalysisTask<ToolAnalysis> {
    description = "Liste as ferramentas provavelmente necessárias para atender à solicitação.";
    expectedShape = '{"requiredTools":["Internet","Sistema de arquivos"],"confidence":0.88}';
    requiredFields: Array<keyof ToolAnalysis> = ["requiredTools", "confidence"];

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

    validate(result: unknown): ToolAnalysis {
        if (!result || typeof result !== "object" || Array.isArray(result)) {
            throw new Error("O resultado da análise de ferramentas deve ser um objeto.");
        }

        const payload = result as Record<string, unknown>;
        const requiredTools = Array.isArray(payload.requiredTools)
            ? payload.requiredTools.filter((item): item is string => typeof item === "string")
            : [];
        const confidence = typeof payload.confidence === "number" ? payload.confidence : NaN;

        if (!requiredTools.length) {
            throw new Error("Nenhuma ferramenta identificada.");
        }

        if (!Number.isFinite(confidence) || confidence < 0 || confidence > 1) {
            throw new Error("Confidence inválida.");
        }

        return { requiredTools, confidence };
    }
}
