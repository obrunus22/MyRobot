export class LLMAnalyzer {
    /**
     * Serviço vazio preparado para encapsular chamadas a modelos de IA.
     * Futuramente pode receber um provedor concreto via injeção de dependência.
     */
    constructor(private readonly provider?: unknown) {}
}
