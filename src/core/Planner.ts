import { PlannerAction } from "./PlannerAction";
import { PlannerResult } from "./PlannerResult";
import { ChatMessage, OllamaProvider } from "../llm/ollamaProvider";

export class Planner {
    constructor(
        private llm: OllamaProvider
    ) { }

    async plan(
        messages: ChatMessage[]
    ): Promise<PlannerResult> {


        const response = await this.llm.plan([
            {
                role: "system",
                content: `
                    Você é um módulo interno de planejamento de um agente de IA.

                    Você NÃO responde perguntas.
                    Você NÃO explica conceitos.
                    Você NÃO ensina nada.

                    Sua única função é escolher qual módulo deve executar a solicitação.

                    Existem somente quatro ações possíveis:

                    CHAT:
                    Use quando a resposta pode ser criada usando o conhecimento geral da inteligência artificial.

                    Exemplos:
                    - "Explique como funciona React"
                    - "O que é Docker?"
                    - "Como funciona um banco SQL?"
                    - "Quem foi Albert Einstein?"

                    MEMORY:
                    Use SOMENTE quando o usuário estiver perguntando sobre informações pessoais armazenadas anteriormente.

                    Exemplos:
                    - "Qual meu nome?"
                    - "Qual linguagem de programação eu uso?"
                    - "Qual era a arquitetura do meu agente?"
                    - "Você lembra meu projeto?"

                    IMPORTANTE:
                    MEMORY NÃO significa conhecimento necessário.
                    MEMORY NÃO significa informação aprendida pela IA.
                    MEMORY significa somente dados guardados sobre o usuário.

                    TOOL:
                    Use quando uma ferramenta externa precisa ser executada.

                    Exemplos:
                    - "Pesquise na internet"
                    - "Abra um arquivo"
                    - "Execute um comando"

                    ASK_USER:
                    Use quando não existe informação suficiente para decidir.

                    Exemplo:
                    - "Faça isso"
                    - "Configure aquilo"

                    Agora classifique a solicitação.

                    Retorne APENAS JSON válido.

                    Formato:

                    {
                    "action": "CHAT|MEMORY|TOOL|ASK_USER",
                    "reason": "motivo curto",
                    "confidence": 0.0
                    }
                `},
            ...messages
        ]);


        return JSON.parse(response);

    }
}