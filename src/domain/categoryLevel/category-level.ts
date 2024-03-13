import type { CategoryCode } from "..";

export class CategoryLevel{
    constructor(
        public name: string,
        public code: LevelCode,
        public logo: string,
        public categoryCode: CategoryCode,
        public totalQuestions: number = 0,
        public totalCorrectQuestions: number= 0
    ) {}

    get score(): number {
        if (this.totalQuestions == 0) return 0
        if (this.totalCorrectQuestions == 0) return 0
        return this.totalCorrectQuestions * 100 / this.totalQuestions
    }
}

export enum LevelCode {
    basic = 'basic',
    medium = 'medium'
}
