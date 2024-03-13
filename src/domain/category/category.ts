export class Category{
    constructor(
        public name: string,
        public code: CategoryCode,
        public logo: string,
        public score: number = 0,
        public progress: number = 0,

      ) { }
}

export enum CategoryCode {
    Python = 'python',
    Sql = 'sql',
    Java = 'java',
}