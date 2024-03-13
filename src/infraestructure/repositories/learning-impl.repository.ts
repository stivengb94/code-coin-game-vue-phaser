import type { CategoryCode, Learning, LearningRepository, LevelCode } from "@domain/index";

export class LearningRepositoryImpl implements LearningRepository{
    listBy(category: CategoryCode, codeLevel: LevelCode): Promise<Learning[]> {
        throw new Error("Method not implemented.");
    }
}