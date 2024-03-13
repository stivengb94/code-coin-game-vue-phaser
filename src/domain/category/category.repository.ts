import type { Category, CategoryCode } from "..";
import type { RatingCategory } from "./rating-category";

export interface CategoryRepository{
    restar(): Promise<void>
    list(): Promise<Category[]>
    rating(code: CategoryCode): Promise<RatingCategory>
}

