import { OllamaProvider } from "../../llm/ollamaProvider";
import { ILLMAnalyzer } from "./ILLMAnalyzer";

export class OllamaLLMAnalyzer implements ILLMAnalyzer {
    /**
     * Implementação concreta que conversa com o provedor Ollama.
     * Mantém a responsabilidade limitada a enviar o prompt e retornar o texto.
     */
    constructor(private readonly provider: OllamaProvider) {}

    async analyze(prompt: string): Promise<string> {
        return this.provider.chat([
            {
                role: "system",
                content: prompt,
            },
        ]);
    }
}
