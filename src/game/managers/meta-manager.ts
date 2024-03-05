import type { Scene } from "phaser";

export class MetaManager {
    private scene: Scene;
    icon: string;

    constructor(scene: Scene, icon: string = 'flag-pole') {
        this.scene = scene;
        this.icon = icon;
        this.init();
    }

    private init() {}

    draw(meta: MetaOptions) : Phaser.Types.Physics.Arcade.ImageWithDynamicBody{
        let platformMeta = this.scene.physics.add.image(meta.x, 0, this.icon);
        platformMeta.setCollideWorldBounds(true);
        platformMeta.setBounce(0.3);
        platformMeta.setData("isMeta", true);
        this.scene.physics.add.collider(platformMeta, meta.collider);
        return platformMeta;
    }
}


interface MetaOptions{
    x: number;
    collider: Phaser.Types.Physics.Arcade.ArcadeColliderType
}