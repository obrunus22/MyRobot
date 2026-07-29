export interface ILLMAnalyzer {
    /**
     * Envia um prompt para um modelo de IA e retorna a resposta bruta.
     * Esta interface abstrai o provedor real de LLM para as etapas do Brain.
     */
    analyze(prompt: string): Promise<string>;
}
