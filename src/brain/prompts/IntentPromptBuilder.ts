import { Intent } from "../types/Intent";

export class IntentPromptBuilder {
    /**
     * Gera um prompt estrito para análise de intenção.
     * O modelo deve responder apenas um JSON válido sem explicações adicionais.
     */
    build(text: string): string {
        const allowedIntents = Object.values(Intent).join(", ");

        return [
            "Classifique a intenção do texto do usuário.",
            "Responda SOMENTE com um objeto JSON válido.",
            "Não inclua markdown, explicações, comentários ou texto adicional.",
            `Os valores possíveis para intent são: ${allowedIntents}.`,
            "O formato exato deve ser:",
            '{"intent":"QUESTION","confidence":0.98}',
            "",
            `Texto do usuário:\n${text}`,
        ].join("\n");
    }
}
