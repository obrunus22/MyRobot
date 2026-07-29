import "dotenv/config";
import { Brain } from './core/Brain';
import { OllamaProvider } from "./llm/ollamaProvider";
import { Planner } from "./core/Planner";
import { Executor } from "./core/Executor";

async function main(): Promise<void> {
    const llm = new OllamaProvider();
    const planner = new Planner(llm);
    const executor = new Executor(llm);
    const brain = new Brain(planner, executor);

    const resposta = await brain.think([
        {
            role: "user",
            content: "Preciso planejar a arquitetura do nosso agente e criar um plano inicial.",
        },
    ]);

    console.log(resposta);
}

main().catch((error) => {
    console.error("Erro ao iniciar a aplicação:", error);
    process.exit(1);
});