import { CategoryCode, LevelCode } from "@domain/index";

export class GameEntity {
    constructor(
      public categoryCode:  CategoryCode = CategoryCode.Python,
      public levelCode:  LevelCode = LevelCode.basic,
    ) { }
    
    buildMoney(): string {
        const value: Record<string, string> = {
            "java": "coin-java",
            "sql": "coin-sql",
            "python":"coin-python"
        };
        return value[this.categoryCode] ?? 'coin'
    }

    buildBush(): string {
        const value: Record<CategoryCode, string> = {
            [CategoryCode.Java]: "java",
            [CategoryCode.Sql]: "sql",
            [CategoryCode.Python]:"python"
        };
        return value[this.categoryCode] ?? 'python'
    }
}
  