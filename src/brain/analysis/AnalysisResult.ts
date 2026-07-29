export interface AnalysisResult<T> {
    success: boolean;
    data?: T;
    confidence?: number;
    rawResponse?: string;
    errors: string[];
}
