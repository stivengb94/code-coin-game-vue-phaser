export class Category{
    constructor(
        public name: string,
        public code: CategoryType,
        public score: number = 0,
        public progress: number = 0,
      ) { }
}

export enum CategoryType {
    Python = 'python',
    Sql = 'sql',
    Java = 'java',
}