export interface AnalysisTask<T> {
    /**
     * Descreve o objetivo da tarefa para o prompt do modelo.
     */
    description: string;

    /**
     * Define o formato JSON esperado pela tarefa.
     */
    expectedShape: string;

    /**
     * Lista os campos obrigatórios para validação.
     */
    requiredFields: Array<keyof T>;

    /**
     * Constrói o prompt para a análise.
     */
    buildPrompt(input: string): string;

    /**
     * Valida e transforma o resultado bruto em um objeto tipado.
     */
    validate(result: unknown): T;
}
