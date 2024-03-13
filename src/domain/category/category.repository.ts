import type { Category } from "..";

export interface CategoryRepository{
    list(): Promise<Category[]>
}

