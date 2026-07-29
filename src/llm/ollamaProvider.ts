import { Ollama } from "ollama";

const ollama = new Ollama({
    host: process.env.OLLAMA_HOST,
});

export interface ChatMessage {
    role: "system" | "user" | "assistant";
    content: string;
}

export interface ILLMProvider {
    chat(messages: ChatMessage[]): Promise<string>;
    plan(messages: ChatMessage[]): Promise<string>;
}

export class OllamaProvider {
    private model: string;

    constructor(model: string = process.env.MODEL ?? "llama3.2:3b") {
        this.model = model;
    }

    async chat(messages: ChatMessage[]): Promise<string> {
        const response = await ollama.chat({
            model: this.model,
            messages,
        });

        return response.message.content;
    }

    async plan(messages: ChatMessage[]): Promise<string> {
        const response = await ollama.chat({
            model: process.env.PLANNER_MODEL!,
            messages,
            format: "json",
            options: {
                temperature: 0
            }
        });


        return response.message.content;

    }
}