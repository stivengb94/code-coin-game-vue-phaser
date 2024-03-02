import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import { PlayerManager } from "../managers/player-manager";
import { ScoreManager } from "../managers/score-manager";
import { PlatformManager } from "../managers/platform-manager";
import { CoinManager } from "../managers/coin-manager";
import { CameraManager } from "../managers/camera-manager";

export class Game extends Scene {
    //Components
    playerMgr: PlayerManager;
    scoreMgr: ScoreManager;
    platformMgr: PlatformManager;
    coinMgr: CoinManager;
    cameraMgr: CameraManager;

    //Phaser
    player: Phaser.Physics.Arcade.Sprite; // Cambio a Sprite para manejar animaciones
    score: Phaser.GameObjects.Text; // Nuevo atributo para el texto del puntaje

    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    platforms: Phaser.Types.Physics.Arcade.ImageWithDynamicBody[] = [];
    cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined; // Cambio aquí
    halfScreenWidth: number = 1024;
    backgroundWidth = 5048; // Ancho del fondo
    backgroundHeight = 768; // Altura del fondo
    backgroundScale = 0.5; // Escala del fondo para que cubra toda la pantalla
    numberOfPlatforms = 5; // Número de plataformas que deseas agregar
    constructor() {
        super("Game");
    }
    create() {
        //Managers
        this.playerMgr = new PlayerManager(this);
        this.scoreMgr = new ScoreManager(this);
        this.platformMgr = new PlatformManager(this);
        this.coinMgr = new CoinManager(this);
        this.cameraMgr = new CameraManager(this);

        // Phaser
        this.config();
        this.drawBackground();
        this.drawBush();
        this.player = this.playerMgr.draw();
        this.score = this.scoreMgr.draw();
        this.drawPlatforms();
        this.drawCoins();
        this.cameraMgr.config({
            player: this.player,
            backgroundHeight: this.backgroundHeight,
            backgroundWidth: this.backgroundWidth,
        });
        EventBus.emit("current-scene-ready", this);
    }

    config() {
        this.camera = this.cameras.main;
        this.physics.world.setBoundsCollision(true, false, true, true);
        this.cursors = this.input.keyboard?.createCursorKeys();
    }

    drawBackground() {
        const background = this.add.image(-200, 0, "bgCloud"); // Añadir fondo
        background.setOrigin(0, 0); // Establecer el origen en la esquina superior izquierda
        background.setScale(this.backgroundScale); // Escalar el fondo para cubrir toda la pantalla
        // Ajustar la imagen al tamaño de la ventana del navegador sin deformarse
        background.setScrollFactor(0); // Evitar que el fondo se desplace con la cámara
    }

    drawBush() {
        this.add.image(1055, 420, "bush").setScale(1.5);
        this.add.image(455, 500, "iphyton").setScale(0.5);
    }

    drawCoins() {
        const coins = this.coinMgr.drawMany(5);
        this.physics.add.collider(coins, this.platforms);
    }

    drawPlatforms() {
        this.platforms = this.platformMgr.drawMany(
            this.numberOfPlatforms,
            { x: 455, y: 720 }
        );
        this.physics.add.collider(this.player, this.platforms);
    }

    update(time: number, delta: number): void {
        // Mueve al jugador según las teclas de flecha
        if (this.cursors?.left.isDown) {
            this.player?.setVelocityX(-this.playerMgr.runSpeed);
            this.player?.anims.play("left", true); // Activa la animación de caminar hacia la izquierda
        } else if (this.cursors?.right.isDown) {
            this.player?.setVelocityX(this.playerMgr.runSpeed);
            this.player?.anims.play("right", true); // Activa la animación de caminar hacia la derecha
        } else {
            this.player?.setVelocityX(0);
            this.player?.anims?.play("turn");
        }

        // Salto: verifica si el jugador está en el suelo y presiona la tecla de flecha hacia arriba
        if (this.cursors?.up.isDown && this.player?.body?.touching.down) {
            // Aplica una velocidad vertical hacia arriba
            this.player.setVelocityY(this.playerMgr.jumpSpeed);
        }

        //Aplicar movimeinto al score
        if (this.scoreMgr?.scoreText) {
            const x = this.player.x - this.cameras.main.width / 2 + 10;
            this.scoreMgr?.scoreText.setPosition(x, 10);
        }

        // Detecta la superposición con las monedas
        this.children.each((coin: any) => {
            // Verifica si el objeto es una moneda
            if (
                coin.getData("isCoin") &&
                this.physics.overlap(this.player, coin)
            ) {
                // Cuando el jugador recoge una moneda
                coin.destroy(); // Elimina la moneda del juego
                // Incrementa la puntuación del jugador
                this.scoreMgr.increment();
            }
        });
    }

    changeScene() {
        this.scene.start("GameOver");
    }
}
