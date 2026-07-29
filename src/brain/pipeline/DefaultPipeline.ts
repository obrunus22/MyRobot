import { Brain } from "../Brain";
import { EntityExtractorStep } from "./EntityExtractorStep";
import { EmotionAnalyzerStep } from "./EmotionAnalyzerStep";
import { InputNormalizerStep } from "./InputNormalizerStep";
import { IntentClassifierStep } from "./IntentClassifierStep";
import { TopicManagerStep } from "./TopicManagerStep";
import { DefaultEntityExtractor } from "../../core/DefaultEntityExtractor";
import { DefaultEmotionAnalyzer } from "../../core/DefaultEmotionAnalyzer";
import { DefaultTopicManager } from "../../core/DefaultTopicManager";
import { OllamaProvider } from "../../llm/ollamaProvider";
import { OllamaLLMProvider } from "../analysis/OllamaLLMProvider";
import { AnalysisEngine } from "../analysis/AnalysisEngine";
import { PromptTemplate } from "../analysis/PromptTemplate";
import { JsonExtractor } from "../analysis/JsonExtractor";
import { JsonValidator } from "../analysis/JsonValidator";
import { CognitiveStateBuilder } from "../cognitive/CognitiveStateBuilder";
import { GoalModule } from "../cognitive/modules/GoalModule";
import { SubjectModule } from "../cognitive/modules/SubjectModule";
import { KnowledgeModule } from "../cognitive/modules/KnowledgeModule";
import { ToolModule } from "../cognitive/modules/ToolModule";

export function createDefaultBrain(): Brain {
    const llmProvider = new OllamaLLMProvider(new OllamaProvider());
    const analysisEngine = new AnalysisEngine(
        llmProvider,
        new PromptTemplate(),
        new JsonExtractor(),
        new JsonValidator()
    );

    const cognitiveStateBuilder = new CognitiveStateBuilder([
        new GoalModule(analysisEngine),
        new SubjectModule(analysisEngine),
        new KnowledgeModule(analysisEngine),
        new ToolModule(analysisEngine),
    ]);

    return new Brain([
        new InputNormalizerStep(),
        new IntentClassifierStep(analysisEngine),
        new EntityExtractorStep(new DefaultEntityExtractor()),
        new EmotionAnalyzerStep(new DefaultEmotionAnalyzer()),
        new TopicManagerStep(new DefaultTopicManager()),
    ], cognitiveStateBuilder);
}
