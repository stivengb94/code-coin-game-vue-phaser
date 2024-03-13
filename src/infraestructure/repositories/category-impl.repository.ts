import { RatingCategory } from "@domain/category/rating-category";
import { Category, CategoryCode, CategoryLevel, type CategoryRepository } from "@domain/index";
import { CategoryLevelManager, CategoryManager, QuizLocalManager } from "..";

export class CategoryRepositoryImpl implements CategoryRepository{
    async restart(): Promise<void> {
        QuizLocalManager.restart();
    }
   
    list(): Promise<Category[]> {
        return Promise.resolve(CategoryManager.getResult())
    }
    
    rating(code: CategoryCode): Promise<RatingCategory> {
        let results = CategoryLevelManager.getResult(code)
        const averageScore = CategoryLevelManager.calAverageScore(results);
        const progress = CategoryLevelManager.calProgress(results);
        let response = new RatingCategory(averageScore, progress, this.getLogo(code))
        return Promise.resolve(response)
    }

    private getLogo = (category: CategoryCode) =>  {
        const logos: Record<CategoryCode, string> = {
            [CategoryCode.Python]: 'phyton-platform.png',
            [CategoryCode.Sql]: 'sql-platform.png',
            [CategoryCode.Java]: 'java-platform.png'
        };
        return logos[category] ?? 'phyton-platform.png';
    }
}