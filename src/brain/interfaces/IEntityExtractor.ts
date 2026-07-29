import { Entity } from "../types/Entity";

export interface IEntityExtractor {
    extract(input: string): Promise<Entity[]> | Entity[];
}
