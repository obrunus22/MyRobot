export class JsonExtractor {
    /**
     * Extrai o primeiro bloco JSON válido encontrado em uma resposta textual.
     */
    extract(response: string): string {
        const normalized = response.trim();

        if (!normalized) {
            throw new Error("Resposta vazia do modelo.");
        }

        const fenced = normalized.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
        if (fenced?.[1]) {
            return fenced[1].trim();
        }

        const start = normalized.indexOf("{");
        const end = normalized.lastIndexOf("}");

        if (start >= 0 && end > start) {
            return normalized.slice(start, end + 1).trim();
        }

        throw new Error("Nenhum JSON válido foi encontrado na resposta do modelo.");
    }
}
