import { CategoryType, Category, type CategoryRepository } from "@domain/index";

export class CategoryRepositoryImpl implements CategoryRepository{
    list(): Promise<Category[]> {
        return Promise.resolve([
            new Category('Python', CategoryType.Python),
            new Category('Java', CategoryType.Java),
            new Category('Sql', CategoryType.Sql)
       ])
    }
}