import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import { PlayerManager } from "../managers/player-manager";
import { ScoreManager } from "../managers/score-manager";
import { PlatformManager } from "../managers/platform-manager";
import { CoinManager } from "../managers/coin-manager";
import { CameraManager } from "../managers/camera-manager";
import { MetaManager } from "../managers/meta-manager";
import type { GameEntity } from "../entities/GameEntity";
import { ArgumentsScene } from "../arguments/arguments-scene";
import type { CoinParams } from "../entities/Params";

export class Game extends Scene {
    //Components
    playerMgr: PlayerManager;
    scoreMgr: ScoreManager;
    platformMgr: PlatformManager;
    coinMgr: CoinManager;
    cameraMgr: CameraManager;
    metaMgr: MetaManager;


    //Phaser
    player: Phaser.Physics.Arcade.Sprite; // Cambio a Sprite para manejar animaciones
    score: Phaser.GameObjects.Text; // Nuevo atributo para el texto del puntaje

    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    platforms: Phaser.Types.Physics.Arcade.ImageWithDynamicBody[] = [];
    cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined; // Cambio aquí
    halfScreenWidth: number = 1024;
    backgroundWidth = 5048; // Ancho del fondo
    backgroundHeight = 568; // Altura del fondo
    backgroundScale = 0.5; // Escala del fondo para que cubra toda la pantalla
    numberOfPlatforms = 5; // Número de plataformas que deseas agregar
    logoTween: Phaser.Tweens.Tween | null;

    numberCoins = 10;
    params: GameEntity;

    // Botones
    buttonLeft: Phaser.GameObjects.Image;
    buttonRight: Phaser.GameObjects.Image;
    buttonUp: Phaser.GameObjects.Image;

    // Estados de los botones
    isButtonLeftPressed: boolean = false;
    isButtonRightPressed: boolean = false;
    isButtonUpPressed: boolean = false;

    constructor() {
        super("Game");
    }

    init() {
        EventBus.emit("current-scene-init", this);
    }
    create() {
        this.params = ArgumentsScene.getInstance().getParams() 
        //Managers
        this.playerMgr = new PlayerManager(this);
        this.scoreMgr = new ScoreManager(this, this.numberCoins);
        this.platformMgr = new PlatformManager(this);
        this.coinMgr = new CoinManager(this, this.params.buildMoney());
        this.cameraMgr = new CameraManager(this);
        this.metaMgr = new MetaManager(this);

        // Phaser
        this.config();
        this.drawBackground();
        this.drawBush();
        this.player = this.playerMgr.draw();
        this.player.x = this.cameras.main.width / 2; // Posición inicial del jugador centrada en el eje X

        this.score = this.scoreMgr.draw();
        this.drawPlatforms();
        this.drawCoins();
        this.drawMeta();
        this.cameraMgr.config({
            player: this.player,
            backgroundHeight: this.backgroundHeight,
            backgroundWidth: this.backgroundWidth,
        });


        // Agregar botones
        this.controlsConfig()
       
        EventBus.emit("current-scene-ready", this);
    }

    controlsConfig() {
        this.buttonLeft = this.add.image((this.cameras.main.width / 2) -100, this.cameras.main.height - 40, "buttonLeft").setInteractive();
        this.buttonRight = this.add.image((this.cameras.main.width / 2) + 100, this.cameras.main.height - 40, "buttonRight").setInteractive();
        this.buttonUp = this.add.image((this.cameras.main.width / 2), this.cameras.main.height - 40, "buttonUp").setInteractive();
 
        // Configurar eventos de clic
        this.buttonLeft.on('pointerdown', () => {
             this.isButtonLeftPressed = true;
            this.isButtonRightPressed = false;
            this.isButtonUpPressed = false;
        });

        this.buttonLeft.on('pointerout', () => {
            this.isButtonLeftPressed = false;
        });

        this.buttonRight.on('pointerdown', () => {
            this.isButtonRightPressed = true;
            this.isButtonLeftPressed = false;
            this.isButtonUpPressed= false

        });

        this.buttonRight.on('pointerout', () => {
            this.isButtonRightPressed = false;
        });

        this.buttonUp.on('pointerdown', () => {
            this.isButtonUpPressed= true
            this.isButtonRightPressed = false;
            this.isButtonLeftPressed = false;
        });

        this.buttonUp.on('pointerout', () => {
            this.isButtonUpPressed = false;
        });
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
        this.add.image(755, 500, this.params.buildBush()).setScale(0.5);
    }

    drawCoins() {
        const coins = this.coinMgr.drawMany(this.numberCoins);
        this.physics.add.collider(coins, this.platforms);
    }

    drawMeta = () => this.metaMgr.draw({ x: this.backgroundWidth - 400, collider: this.platforms});

    drawPlatforms() {
        this.platforms = this.platformMgr.drawMany(
            this.numberOfPlatforms,
            { x: 455, y: 720 }
        );
        this.physics.add.collider(this.player, this.platforms);
    }

    update(time: number, delta: number): void {
       this.updateButtonPositions()
        // Mueve al jugador según las teclas de flecha
        if (this.cursors?.left.isDown || this.isButtonLeftPressed) {
            this.player?.setVelocityX(-this.playerMgr.runSpeed);
            this.player?.anims.play("left", true);
        } else if (this.cursors?.right.isDown || this.isButtonRightPressed) {
            this.player?.setVelocityX(this.playerMgr.runSpeed);
            this.player?.anims.play("right", true);
        } else {
            this.player?.setVelocityX(0);
            this.player?.anims?.play("turn");
        }
    

        // Salto: verifica si el jugador está en el suelo y presiona la tecla de flecha hacia arriba
        if ((this.cursors?.up.isDown && this.player?.body?.touching.down) ||
            (this.isButtonUpPressed && this.player?.body?.touching.down)) {
            // Aplica una velocidad vertical hacia arriba
            this.player.setVelocityY(this.playerMgr.jumpSpeed);
        }

        //Aplicar movimeinto al score
        if (this.scoreMgr?.scoreText) {
            const cameraScrollX = this.cameras.main.scrollX;

            const x = (this.cameras.main.width / 2) + cameraScrollX - 150;
            this.scoreMgr?.scoreText.setPosition(x, 10);
        }

        // Detecta la superposición con las monedas
        this.children.each((gameObject: any) => {
            // Verifica si el objeto es una moneda
            if (
                gameObject.getData("isCoin") &&
                this.physics.overlap(this.player, gameObject)
            ) {
                const data: CoinParams = gameObject.getData("isCoin")
                // Cuando el jugador recoge una moneda
                gameObject.destroy(); // Elimina la moneda del juego
                // Incrementa la puntuación del jugador
                this.scoreMgr.increment();
                EventBus.emit("scene-coin-capture", data);
            }

            if (
                gameObject.getData("isMeta") &&
                this.physics.overlap(this.player, gameObject)
            ) {
                gameObject.setData("isMeta", false) 
                EventBus.emit("scene-finished", true);
            }
        });
    }

    updateButtonPositions() {
        // Ajustar la posición de los botones según el desplazamiento de la cámara
        const cameraScrollX = this.cameras.main.scrollX;
        this.buttonLeft.x = (this.cameras.main.width / 2) - 100 + cameraScrollX;
        this.buttonRight.x = (this.cameras.main.width / 2) + 100 + cameraScrollX;
        this.buttonUp.x = (this.cameras.main.width / 2) + cameraScrollX;

    }
}
