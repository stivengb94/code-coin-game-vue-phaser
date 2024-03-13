import type { CategoryCode, LevelCode } from ".."

export class QuizzRequest {
    constructor(
      public categoryLevelCode: LevelCode,
      public categoryCode: CategoryCode,
      public totalQuestions: number = 0,
      public totalCorrectQuestions: number= 0
    ) {}
}