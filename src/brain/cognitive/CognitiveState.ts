export interface CognitiveState {
    goal?: string;
    subject?: string;
    currentTopic?: string;
    requiredKnowledge: string[];
    requiredTools: string[];
    confidence: number;
    reasoningHints: string[];
    metadata: Record<string, unknown>;
}
