import { CategoryCode, CategoryLevel, LevelCode } from "@domain/index";
import { QuizLocalManager, type ResultStorage } from "..";

export class CategoryLevelManager {
   
    constructor() { }

    static levels = (category: CategoryCode) => [
        new CategoryLevel("Basico", LevelCode.basic, CategoryLevelManager.getLogo(category), category),
        new CategoryLevel("Intermedio", LevelCode.medium, CategoryLevelManager.getLogo(category), category)
    ]
    
    static getLogo = (category: CategoryCode) =>  {
        const logos: Record<CategoryCode, string> = {
            [CategoryCode.Python]: 'money-python.png',
            [CategoryCode.Sql]: 'money-sql.png',
            [CategoryCode.Java]: 'money-java.png'
        };
        return logos[category] ?? 'money-python.png';
    }

    static getResult = (categoryCode: CategoryCode): CategoryLevel[] => {
        let results: ResultStorage[] = QuizLocalManager.findResults(categoryCode)
        const levelsWithResult = CategoryLevelManager.levels(categoryCode).map(item => {
            const find = results.find(a => a.categoryCode == categoryCode && a.categoryLevelCode === item.code)
            if (find) {
                item.totalCorrectQuestions = find.totalCorrectQuestions
                item.totalQuestions = find.totalQuestions
            }
            return item
        })
        return levelsWithResult;
    }

    static calProgress(levelsWithResult: CategoryLevel[]): number {
        const totalLevels = levelsWithResult.length
        const totalFinished = this.calFinished(levelsWithResult)
        const progress = totalLevels > 0 ? (totalFinished* 100) / totalLevels : 0;
        return progress;
    }

    static calFinished = (levelsWithResult: CategoryLevel[]): number =>
        levelsWithResult.filter(a => a.totalQuestions > 0).length

    static calAverageScore(levelsWithResult: CategoryLevel[]): number {
        const totalScores = levelsWithResult.reduce((accumulator, currentLevel) => {
            return accumulator + currentLevel.score;
        }, 0);
        const averageScore = levelsWithResult.length > 0 ? totalScores / levelsWithResult.length : 0;
        return averageScore;
    }
}