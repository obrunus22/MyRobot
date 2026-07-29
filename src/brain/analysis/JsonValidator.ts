export class JsonValidator {
    /**
     * Valida um objeto JSON bruto usando regras simples e mensagens amigáveis.
     */
    validate<T>(payload: unknown, requiredFields: Array<keyof T>): payload is T {
        if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
            throw new Error("O JSON deve ser um objeto.");
        }

        const record = payload as Record<string, unknown>;

        for (const field of requiredFields) {
            if (!(field in record)) {
                throw new Error(`Campo obrigatório ausente: ${String(field)}`);
            }
        }

        return true;
    }
}
