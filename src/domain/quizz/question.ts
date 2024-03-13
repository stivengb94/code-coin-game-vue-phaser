export class Question {
    constructor(
        public code: string,
        public name: string,
        public options: string[],
        public correctAnswer: string,
        public index: number
    ) {}
}