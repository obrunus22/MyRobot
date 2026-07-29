import { BrainContext } from "../BrainContext";
import { IEntityExtractor } from "../interfaces/IEntityExtractor";
import { BrainStep } from "./BrainStep";

export class EntityExtractorStep implements BrainStep {
    /**
     * Extrai entidades da entrada para preparar futuras integrações com memória e ferramentas.
     */
    constructor(private readonly extractor: IEntityExtractor) {}

    async execute(context: BrainContext): Promise<BrainContext> {
        const entities = await this.extractor.extract(context.normalizedInput);

        return {
            ...context,
            entities,
        };
    }
}
