import { RatingCategory } from "@domain/category/rating-category";
import { Category, CategoryCode, CategoryLevel, type CategoryRepository } from "@domain/index";
import { CategoryLevelManager, QuizLocalManager } from "..";

export class CategoryRepositoryImpl implements CategoryRepository{
    async restar(): Promise<void> {
        QuizLocalManager.restart();
    }
   
    list(): Promise<Category[]> {
        return Promise.resolve([
            new Category('Python', CategoryCode.Python, 'python.png'),
            new Category('Java', CategoryCode.Java, 'java.png'),
            new Category('Sql', CategoryCode.Sql,'sql.png')
       ])
    }
    
    rating(code: CategoryCode): Promise<RatingCategory> {
        let results = CategoryLevelManager.getResult(code)
        const averageScore = this.calAverageScore(results);
        const progress = this.calProgress(results);
        let response = new RatingCategory(averageScore, progress, this.getLogo(code))
        return Promise.resolve(response)
    }


    private calProgress(levelsWithResult: CategoryLevel[]) {
        const totalLevels = levelsWithResult.length
        const totalFinished = this.calFinished(levelsWithResult)
        const progress = totalLevels > 0 ? (totalFinished* 100) / totalLevels : 0;
        return progress;
    }

    private calFinished = (levelsWithResult: CategoryLevel[]) =>
        levelsWithResult.filter(a => a.totalQuestions > 0).length

    private calAverageScore(levelsWithResult: CategoryLevel[]) {
        const totalScores = levelsWithResult.reduce((accumulator, currentLevel) => {
            return accumulator + currentLevel.score;
        }, 0);
        const averageScore = levelsWithResult.length > 0 ? totalScores / levelsWithResult.length : 0;
        return averageScore;
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