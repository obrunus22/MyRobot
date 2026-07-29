import { PlannerAction } from "./PlannerAction";

export interface PlannerResult {
    action: PlannerAction;
    reason?: string;
    confidence?: number;
}