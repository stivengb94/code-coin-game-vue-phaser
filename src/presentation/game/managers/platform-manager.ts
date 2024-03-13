import type { Scene } from "phaser";

export class PlatformManager {
    platform: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    private scene: Scene;
    private icon: string;

    constructor(scene: Scene, icon: string = 'platform' ) { 
        this.scene = scene;
        this.icon = icon;
        this.init();
    }
    
    private init() {}

    draw(options: PlatformOptions) : Phaser.Types.Physics.Arcade.ImageWithDynamicBody{
        let platform = this.scene.physics.add.image(options.x, options.y, this.icon);
        platform.setImmovable();
        platform.setCollideWorldBounds(true);
        return platform;
    }

    drawMany(quantity: number, options:PlatformOptions ): Phaser.Types.Physics.Arcade.ImageWithDynamicBody[] {
        let platformWidth = 0; // Ancho de la plataforma
        let platforms:Phaser.Types.Physics.Arcade.ImageWithDynamicBody[]  = []
        for (let i = 0; i < quantity; i++) {
            const _x = i == 0 ? options.x : platformWidth * i + options.x;
            let platform = this.draw({
                x: _x,
                y: options.y
            })
            platformWidth = platform.width;
            platforms.push(platform);
        }
        return platforms;
    }

}

interface PlatformOptions{
    x: number;
    y: number;
}