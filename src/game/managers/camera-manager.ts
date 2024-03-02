import type { Scene } from "phaser";

export class CameraManager {
    platform: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    private scene: Scene;

    constructor(scene: Scene ) { 
        this.scene = scene;
        this.init();
    }
    
    private init() {}

    config(options: CameraOptions) {
        // Mover el fondo a una velocidad diferente para el efecto parallax
        this.scene.cameras.main.setBounds(
            0,
            0,
            options.backgroundWidth,
            options.backgroundHeight
        );
        this.scene.cameras.main.startFollow(options.player);
        this.scene.cameras.main.scrollX = 0.5; // Ajusta la velocidad horizontal del fondo
        this.scene.cameras.main.scrollY = 0; // Ajusta la velocidad vertical del fondo
    }
}

interface CameraOptions{
    backgroundWidth: number;
    backgroundHeight: number;
    player: object | Phaser.GameObjects.GameObject;
}