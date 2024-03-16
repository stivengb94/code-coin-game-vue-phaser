import { LevelCode, type CategoryCode, Question, type QuizzRepository, type QuizzRequest } from "@domain/index";
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
    async getBy(category: CategoryCode, level: LevelCode): Promise<Question[]> {
        const learnigs = await this.getQuizz(category)
        const mapValue: Record<LevelCode, QuizzItem[]> = {
            [LevelCode.basic]: learnigs.basic,
            [LevelCode.medium]: learnigs.medium
        };
        const result = (mapValue[level] ?? []).map(item => new Question(
            item.questionCode,
            item.question,
            item.options,
            item.correctAnswer,
            item.index
        ))
        return result
    }

    private getQuizz(category: string): Promise<QuizzDto> {
        let request = <RequestInit>{
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        };
        return new Promise<QuizzDto>((resolve, reject) => {
            fetch(`/assets/files/${category}_test.json`, request)
              .then((response: Response) => response.json())
              .then((data) => resolve(data))
              .catch((error) => reject(error));
        })
    }
}

export interface QuizzDto{
    basic: Array<QuizzItem>,
    medium: Array<QuizzItem>
}

export interface QuizzItem{
    questionCode: string;
    question: string;
    options: Array<string>;
    correctAnswer: string;
    index: number;
}