import { CategoryCode, CategoryLevel, type CategoryLevelRepository } from "@domain/index";
import { CategoryLevelManager } from "..";

export class CategoryLevelRepositoryImpl implements CategoryLevelRepository {
    listBy(category: CategoryCode): Promise<CategoryLevel[]> {
        return Promise.resolve(CategoryLevelManager.getResult(category))
    }
}