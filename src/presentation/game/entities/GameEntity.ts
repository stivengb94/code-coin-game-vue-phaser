
export class GameEntity {
    constructor(
      public programingCode:  string = 'python',
      public levelCode:  string = 'basic',
    ) { }
    
    buildMoney(): string {
        const value: Record<string, string> = {
            "java": "coin-java",
            "sql": "coin-sql",
            "python":"coin-phyton"
        };
        return value[this.programingCode] ?? 'coin'
    }

    buildBush(): string {
        const value: Record<string, string> = {
            "java": "java",
            "sql": "sql",
            "python":"iphyton"
        };
        return value[this.programingCode] ?? 'iphyton'
    }
}
  