import type { Languages, Levels } from "@/utils/utils";

export class GameEntity {
    constructor(
      public programingCode: Languages = 'python',
      public levelCode: Levels = 'basic',
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
  