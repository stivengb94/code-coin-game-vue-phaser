import type { LearningLevel } from "..";

export interface LearningLevelRepository{
    listByCategory(codeCategory: string): Promise<LearningLevel[]>
}