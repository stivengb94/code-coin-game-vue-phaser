import { Category, CategoryCode } from "@domain/index";
import { CategoryLevelManager } from "..";

export class CategoryManager {
   
    constructor() { }

    static categories = () => [
        new Category('Python', CategoryCode.Python, 'python.png'),
        new Category('Java', CategoryCode.Java, 'java.png'),
        new Category('Sql', CategoryCode.Sql,'sql.png')
    ]

    static findByCode = (categoryCode: CategoryCode): Category | undefined => {
        const result = CategoryManager.categories().find(a=>a.code === categoryCode)
        return result;
    }


    static getResult = (): Category[] => {
        const result = CategoryManager.categories().map(item => {
            let results = CategoryLevelManager.getResult(item.code)
            item.score = CategoryLevelManager.calAverageScore(results)
            item.progress = CategoryLevelManager.calProgress(results)
            return item
        })
        return result;
    }
}