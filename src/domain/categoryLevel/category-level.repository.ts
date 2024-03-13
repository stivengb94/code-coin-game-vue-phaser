import type { CategoryCode, CategoryLevel } from "..";

export interface CategoryLevelRepository{
    listBy(category: CategoryCode): Promise<CategoryLevel[]>
}