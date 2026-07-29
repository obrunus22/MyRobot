import { ILLMProvider } from "./ILLMProvider";
import { JsonExtractor } from "./JsonExtractor";
import { JsonValidator } from "./JsonValidator";
import { AnalysisResult } from "./AnalysisResult";
import { AnalysisTask } from "./tasks/AnalysisTask";

export class AnalysisEngine {
    /**
     * Motor genérico que executa qualquer tarefa de análise baseada em LLM.
     * Ele não conhece intenções, emoções ou entidades; apenas executa a tarefa recebida.
     */
    constructor(
        private readonly llmProvider: ILLMProvider,
        private readonly promptTemplate: { createSystemPrompt: (taskDescription: string) => string; createJsonInstruction: (expectedShape: string) => string; createPromptComplete: (systemPrompt: string, input: string) => string; },
        private readonly jsonExtractor: JsonExtractor,
        private readonly jsonValidator: JsonValidator
    ) {}

    async execute<T>(task: AnalysisTask<T>, input: string): Promise<AnalysisResult<T>> {
        try {
            const prompt = this.buildPrompt(task, input);
            const rawResponse = await this.llmProvider.generate(prompt);
            const extractedJson = this.jsonExtractor.extract(rawResponse);
            const parsed = JSON.parse(extractedJson) as unknown;

            this.jsonValidator.validate<T>(parsed, task.requiredFields);
            const validatedData = task.validate(parsed);

            return {
                success: true,
                data: validatedData,
                confidence: this.extractConfidence(parsed),
                rawResponse,
                errors: [],
            };
        } catch (error) {
            return {
                success: false,
                rawResponse: undefined,
                errors: [error instanceof Error ? error.message : "Erro desconhecido durante a análise."],
            };
        }
    }

    private buildPrompt<T>(task: AnalysisTask<T>, input: string): string {
        const systemPrompt = this.promptTemplate.createSystemPrompt(task.description);
        const instruction = this.promptTemplate.createJsonInstruction(task.expectedShape);
        return this.promptTemplate.createPromptComplete([systemPrompt, instruction].join("\n"), input);
    }

    private extractConfidence(payload: unknown): number | undefined {
        if (payload && typeof payload === "object" && !Array.isArray(payload)) {
            const record = payload as Record<string, unknown>;
            if (typeof record.confidence === "number") {
                return record.confidence;
            }
        }

        return undefined;
    }
}
