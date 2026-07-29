import { OllamaProvider } from "../../llm/ollamaProvider";
import { ILLMProvider } from "./ILLMProvider";

export class OllamaLLMProvider implements ILLMProvider {
    /**
     * Implementação concreta para o provedor Ollama.
     * Mantém-se focada apenas em enviar prompts e receber respostas.
     */
    constructor(private readonly provider: OllamaProvider) {}

    async generate(prompt: string): Promise<string> {
        return this.provider.chat([
            {
                role: "system",
                content: prompt,
            },
        ]);
    }
}
