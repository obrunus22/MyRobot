export class PromptTemplate {
    /**
     * Monta prompts reutilizáveis para diferentes tipos de análise.
     * Centraliza instruções comuns como JSON estrito e ausência de markdown.
     */
    createSystemPrompt(taskDescription: string): string {
        return [
            taskDescription,
            "Responda SOMENTE com um objeto JSON válido.",
            "Não inclua markdown, explicações, comentários ou texto adicional.",
            "O formato deve ser estritamente JSON.",
        ].join("\n");
    }

    createJsonInstruction(expectedShape: string): string {
        return [
            "Formato esperado:",
            expectedShape,
        ].join("\n");
    }

    createPromptComplete(systemPrompt: string, input: string): string {
        return [
            systemPrompt,
            "",
            `Entrada do usuário:\n${input}`,
        ].join("\n");
    }
}
