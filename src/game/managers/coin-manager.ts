import type { Scene } from "phaser";
import type { CoinParams } from "../entities/Params";

export class CoinManager {
    platform: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    private scene: Scene;
    icon: string;

    constructor(scene: Scene, icon: string = 'coin-phyton') {
        this.scene = scene;
        this.icon = icon;
        this.init();
    }

    private init() {}

    drawMany(repeat: number, stepX: number = 500): Phaser.Physics.Arcade.Group
    {
        const coins = this.scene.physics.add.group({
            key: this.icon,
            repeat: repeat == 0 ? repeat : repeat - 1,
            setXY: { x: 250, y: 0, stepX: stepX },
        });
        let index: number = 0
        coins.children.iterate( (child) => {
            this.update(child, index)
            index++;
            return true;
        });
        return coins;
    }

    private update(child: Phaser.GameObjects.GameObject, index: number) {
        const value = child as Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
        value.setData("isCoin", <CoinParams>{index: index});
        value.setScale(0.2);
        value.setCollideWorldBounds(true);
        value.setBounceY(Phaser.Math.FloatBetween(0.1, 0.4)); // Usa una aserción de tipo para decirle a TypeScript que child es un ImageWithDynamicBody
    }
}
