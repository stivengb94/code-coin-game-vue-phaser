import { GameEntity } from "../entities/GameEntity";


export class ArgumentsScene {
  private static _instancia: ArgumentsScene;
  params: GameEntity ;

  private constructor() {}

  public static getInstance(): ArgumentsScene {
    if (!ArgumentsScene._instancia) {
      ArgumentsScene._instancia = new ArgumentsScene();
    }
    return ArgumentsScene._instancia;
  }

  setParams(data: GameEntity): void {
    this.params = data;
  }

  getParams(): GameEntity {
    return this.params ?? new GameEntity();
  }
}