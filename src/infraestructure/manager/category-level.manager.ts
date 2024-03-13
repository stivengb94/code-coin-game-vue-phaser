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
            [CategoryCode.Python]: 'money-phyton.png',
            [CategoryCode.Sql]: 'money-sql.png',
            [CategoryCode.Java]: 'money-java.png'
        };
        return logos[category] ?? 'money-phyton.png';
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
}