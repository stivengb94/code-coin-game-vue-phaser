import type { CategoryCode, LevelCode, QuizzRequest } from "..";
import type { Question } from "./question";

export interface QuizzRepository{
    getBy(category: CategoryCode, level: LevelCode): Promise<Question[]>
    save(request: QuizzRequest): Promise<void>; 
}