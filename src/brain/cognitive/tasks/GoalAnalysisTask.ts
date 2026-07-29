import { AnalysisTask } from "../../analysis/tasks/AnalysisTask";

export interface GoalAnalysis {
    goal: string;
    confidence: number;
}

export class GoalAnalysisTask implements AnalysisTask<GoalAnalysis> {
    description = "Descubra o objetivo principal do usuário.";
    expectedShape = '{"goal":"Construir um robô com Raspberry Pi","confidence":0.95}';
    requiredFields: Array<keyof GoalAnalysis> = ["goal", "confidence"];

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

    validate(result: unknown): GoalAnalysis {
        if (!result || typeof result !== "object" || Array.isArray(result)) {
            throw new Error("O resultado da análise de objetivo deve ser um objeto.");
        }

        const payload = result as Record<string, unknown>;
        const goal = typeof payload.goal === "string" ? payload.goal.trim() : "";
        const confidence = typeof payload.confidence === "number" ? payload.confidence : NaN;

        if (!goal) {
            throw new Error("Objetivo vazio.");
        }

        if (!Number.isFinite(confidence) || confidence < 0 || confidence > 1) {
            throw new Error("Confidence inválida.");
        }

        return { goal, confidence };
    }
}
