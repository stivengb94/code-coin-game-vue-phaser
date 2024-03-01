import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;

    platforms: Phaser.Types.Physics.Arcade.ImageWithDynamicBody[] = [];

    player: Phaser.Physics.Arcade.Sprite; // Cambio a Sprite para manejar animaciones
    cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined; // Cambio aquí

    scoreText: Phaser.GameObjects.Text; // Nuevo atributo para el texto del puntaje
    score: number = 0;

    playerSpeed = 500;
    jumpVelocity = -500; // Velocidad vertical inicial del salto
    halfScreenWidth: number = 1024;

    backgroundWidth = 6048; // Ancho del fondo
    backgroundHeight = 768; // Altura del fondo
    backgroundScale = 1.5; // Escala del fondo para que cubra toda la pantalla

    numberOfPlatforms = 5; // Número de plataformas que deseas agregar

    constructor() {
        super("Game");
    }
    create() {
        this.camera = this.cameras.main;
        this.physics.world.setBoundsCollision(true, false, true, true);
        this.createAnimations();
        this.createBackground();
        this.createPlatformBush();
        this.createPlayer();
        this.createScore();
        this.createPlatforms();
        this.createCoins();
        this.createCamera();
        this.cursors = this.input.keyboard?.createCursorKeys();
        EventBus.emit("current-scene-ready", this);
    }

    createScore() {
        this.scoreText = this.add
            .text(10, 10, `Score: ${this.score}`, {
                fontFamily: "Arial Black",
                fontSize: 38,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "left",
            })
            .setDepth(100);
    }

    incrementScore() {
        // Incrementa la puntuación del jugador
        this.score += 10; // Incrementa la puntuación en 10 puntos por cada moneda
        this.scoreText.setText(`Score: ${this.score}`);
    }

    createPlatformBush() {
        const platformY = 420; // Posición Y común para todas las plataformas
        const bush = this.add.image(455, platformY, "bush");
        bush.setScale(1.5); // Escala el arbusto al 50%
    }

    createPlatforms() {
        const platformY = 720; // Posición Y común para todas las plataformas
        const platformX = 455; // Posición X inicial
        let platformWidth = 0; // Ancho de la plataforma
        for (let i = 0; i < this.numberOfPlatforms; i++) {
            const x = i == 0 ? platformX : platformWidth * i + platformX;
            let platform = this.physics.add.image(x, platformY, "platform");
            platformWidth = platform.width;
            platform.setImmovable();
            platform.setCollideWorldBounds(true);
            this.platforms.push(platform);
        }
        this.physics.add.collider(this.player, this.platforms)
    }

    createCoins() {
        const stars = this.physics.add.group({
            key: "coin",
            repeat: 5,
            setXY: { x: 250, y: 0, stepX: 800 },
        });
        stars.children.iterate(function (child) {
            const value = child as Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
            value.setData("isCoin", true);
            value.setScale(0.05);
            value.setCollideWorldBounds(true);
            value.setBounceY(
                Phaser.Math.FloatBetween(0.1, 0.4)
            ); // Usa una aserción de tipo para decirle a TypeScript que child es un ImageWithDynamicBody
            return true;
        });
        this.physics.add.collider(stars, this.platforms);
    }
    createCamera() {
        // Mover el fondo a una velocidad diferente para el efecto parallax
        this.cameras.main.setBounds(
            0,
            0,
            this.backgroundWidth,
            this.backgroundHeight
        );
        this.cameras.main.startFollow(this.player);
        this.cameras.main.scrollX = 0.5; // Ajusta la velocidad horizontal del fondo
        this.cameras.main.scrollY = 0; // Ajusta la velocidad vertical del fondo
    }

    createPlayer() {
        // Create the player sprite with Arcade physics
        this.player = this.physics.add.sprite(50, 0, "dude");
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.2);
        this.player.setScale(2);
    }

    createBackground() {
        const background = this.add.image(0, 0, "background"); // Añadir fondo
        background.setOrigin(0, 0); // Establecer el origen en la esquina superior izquierda
        background.setScale(this.backgroundScale); // Escalar el fondo para cubrir toda la pantalla
    }

    createAnimations() {
        // Crea la animación para caminar hacia la derecha
        // Crear las animaciones aquí
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 4 }],
            frameRate: 20,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 5,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });
    }

    update(time: number, delta: number): void {
        // Mueve al jugador según las teclas de flecha
        if (this.cursors?.left.isDown) {
            this.player?.setVelocityX(-this.playerSpeed);
            this.player?.anims.play("left", true); // Activa la animación de caminar hacia la izquierda
        } else if (this.cursors?.right.isDown) {
            this.player?.setVelocityX(this.playerSpeed);
            this.player?.anims.play("right", true); // Activa la animación de caminar hacia la derecha
        } else {
            this.player?.setVelocityX(0);
            this.player?.anims?.play("turn");
        }

        // Salto: verifica si el jugador está en el suelo y presiona la tecla de flecha hacia arriba
        if (this.cursors?.up.isDown && this.player?.body?.touching.down) {
            // Aplica una velocidad vertical hacia arriba
            this.player.setVelocityY(this.jumpVelocity);
        }

        //Aplicar movimeinto al score
        if (this.scoreText) {
            const x = this.player.x - this.cameras.main.width / 2 + 10;
            this.scoreText.setPosition(x, 10);
        }

        // Detecta la superposición con las monedas
        this.children.each((coin: any) => {
            // Verifica si el objeto es una moneda
            if (
                coin.getData("isCoin") &&
                this.physics.overlap(this.player, coin)
            ) {
                // alert("Aqui pregunta ?");
                // Cuando el jugador recoge una moneda
                coin.destroy(); // Elimina la moneda del juego
                // Incrementa la puntuación del jugador
                this.incrementScore();
            }
        });
    }

    changeScene() {
        this.scene.start("GameOver");
    }
}
