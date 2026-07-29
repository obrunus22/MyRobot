import { ChatMessage, OllamaProvider } from "../llm/ollamaProvider";
import { PlannerAction } from "./PlannerAction";
import { PlannerResult } from "./PlannerResult";

export class Executor {
    constructor(
        private llm: OllamaProvider
    ) { }

    async execute(
        plan: PlannerResult,
        messages: ChatMessage[]
    ): Promise<string> {
        switch (plan.action) {
            case PlannerAction.CHAT:
                return await this.llm.chat(messages);
            case PlannerAction.MEMORY:
                return "Memória ainda não implementada.";
            case PlannerAction.TOOL:
                return "Ferramentas ainda não implementadas.";
            case PlannerAction.ASK_USER:
                return "Preciso de mais informações.";

            default:
                throw new Error(
                    `Ação desconhecida: ${plan.action}`
                );
        }
    }
}