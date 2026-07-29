import { IEntityExtractor } from "../brain/interfaces/IEntityExtractor";
import { Entity } from "../brain/types/Entity";

export class DefaultEntityExtractor implements IEntityExtractor {
    extract(input: string): Entity[] {
        const tokens = input
            .split(/\s+/)
            .map((token) => token.trim())
            .filter(Boolean);

        return tokens.slice(0, 5).map((token) => ({
            type: "token",
            value: token,
            confidence: 0.6,
        }));
    }
}
