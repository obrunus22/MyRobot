import { Entity } from "./types/Entity";
import { Emotion } from "./types/Emotion";
import { Intent } from "./types/Intent";

export interface BrainContext {
    rawInput: string;
    normalizedInput: string;
    language: string;
    intent: Intent;
    subject?: string;
    action?: string;
    entities: Entity[];
    emotion: Emotion;
    topicId: string;
    conversationId: string;
    isContinuation: boolean;
    confidence: number;
    metadata: Record<string, unknown>;
}
