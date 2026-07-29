import { BrainContext } from "../BrainContext";

export interface BrainStep {
    execute(context: BrainContext): Promise<BrainContext>;
}
