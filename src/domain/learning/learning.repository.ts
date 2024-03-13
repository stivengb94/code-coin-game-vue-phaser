import type { CategoryCode, LevelCode } from "..";
import type { Learning } from "./learning";

export interface LearningRepository{
    listBy(category: CategoryCode, level: LevelCode): Promise<Learning[]>
}