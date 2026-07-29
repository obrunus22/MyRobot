export interface ILLMProvider {
    /**
     * Gera uma resposta textual a partir de um prompt.
     * Esta interface abstrai qualquer provedor real de IA.
     */
    generate(prompt: string): Promise<string>;
}
