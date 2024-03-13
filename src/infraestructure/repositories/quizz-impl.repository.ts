import type { CategoryCode, LevelCode, Question, QuizzRepository, QuizzRequest } from "@domain/index";
import { QuizLocalManager } from "@infraestructure/manager/quizz-local.manager";
import type { ResultStorage } from "@infraestructure/model/quizz-storage";

export class QuizzRepositoryImpl implements QuizzRepository{
    async save(request: QuizzRequest): Promise<void> {
        const objStorage = <ResultStorage>{
            categoryCode: request.categoryCode,
            categoryLevelCode: request.categoryLevelCode,
            totalCorrectQuestions: request.totalCorrectQuestions,
            totalQuestions: request.totalQuestions
        }
        QuizLocalManager.save(objStorage)
    }
    getBy(category: CategoryCode, level: LevelCode): Promise<Question[]> {
        throw new Error("Method not implemented.");
    }
}