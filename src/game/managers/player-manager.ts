import type { Scene } from "phaser";

export class PlayerManager {
    player: Phaser.Physics.Arcade.Sprite;
    private scene: Scene;
    private icon: string = 'dude' 
    runSpeed = 500;
    jumpSpeed = -500; // Velocidad vertical inicial del salto

    constructor(scene: Scene) { 
        this.scene = scene;
        this.init();
    }
    
    private init() {
        this.createWalkAnimations();
    }

    draw() {
        let _player = this.scene.physics.add.sprite(50, 0, this.icon);
        _player.setCollideWorldBounds(true);
        _player.setBounce(0.2);
        //_player.setScale(0.7, 0.7); 
        _player.setScale(1.5);
        this.player = _player
        return this.player;
    }

    /* private createWalkAnimations() {
        this.scene.anims.create({
            key: "left",
            frames: this.scene.anims.generateFrameNumbers(this.icon, { start: 8, end: 0 }),
            frameRate: 10,
            repeat: -1,
        });

        this.scene.anims.create({
            key: "turn",
            frames: [{ key: this.icon, frame: 9 }],
            frameRate: 20,
        });

        this.scene.anims.create({
            key: "right",
            frames: this.scene.anims.generateFrameNumbers(this.icon, { start: 10, end: 17 }),
            frameRate: 10,
            repeat: -1,
        });
    }  */

   private createWalkAnimations() {
        this.scene.anims.create({
            key: "left",
            frames: this.scene.anims.generateFrameNumbers(this.icon, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });

        this.scene.anims.create({
            key: "turn",
            frames: [{ key: this.icon, frame: 4 }],
            frameRate: 20,
        });

        this.scene.anims.create({
            key: "right",
            frames: this.scene.anims.generateFrameNumbers(this.icon, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1,
        });
    } 
}