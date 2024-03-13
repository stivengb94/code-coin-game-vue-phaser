import type { CategoryType } from "..";

export class LearningLevel{
    constructor(
        public name: string,
        public code: Level,
        public categoryCode: CategoryType,
        public score: number = 0,
        public correctAnswers: number = 0,
        public wrongAnswers: number= 0
      ) { }
}

export enum Level {
    basic = 'basic',
    medium = 'medium'
}
