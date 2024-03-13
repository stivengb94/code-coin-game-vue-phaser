import { Level, CategoryType,  LearningLevel, type LearningLevelRepository } from "@domain/index";

export class LearningLevelRepositoryImpl implements LearningLevelRepository{
    listByCategory(type: CategoryType): Promise<LearningLevel[]> {
        return Promise.resolve([
            new LearningLevel('Basico',Level.basic,  CategoryType.Python),
            new LearningLevel('Medio', Level.medium, CategoryType.Python),
       ])
    }
}