import type { Scene } from "phaser";

export class ScoreManager {
    scoreText: Phaser.GameObjects.Text; // Nuevo atributo para el texto del puntaje
    total: number = 0;
    count: number = 0;


    private scene: Scene;
    constructor(scene: Scene, total: number) { 
        this.scene = scene;
        this.total = total;
        this.init();
    }
    
    private init() {    }

    draw() : Phaser.GameObjects.Text
    {
        this.scoreText = this.scene.add
            .text(10, 10, `${this.count} / ${this.total} Monedas`, {
                fontFamily: "Arial Black",
                fontSize: 38,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "left",
            })
            .setDepth(100);
        return this.scoreText;
    }

    increment() {
        // Incrementa la puntuación del jugador
        this.count += 1; // Incrementa la puntuación en 10 puntos por cada moneda
        this.scoreText.setText(`${this.count} / ${this.total} Monedas`);
    }
}