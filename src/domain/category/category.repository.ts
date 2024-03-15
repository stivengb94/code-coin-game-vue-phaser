import type { Category, CategoryCode } from "..";
import type { RatingCategory } from "./rating-category";

export interface CategoryRepository{
    restart(): Promise<void>
    list(): Promise<Category[]>
    getCategory(code: CategoryCode): Promise<Category | undefined>
    rating(code: CategoryCode): Promise<RatingCategory>
}

