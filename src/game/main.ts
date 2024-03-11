import { Boot } from './scenes/Boot';
import { Game as MainGame } from './scenes/Game';
import Phaser from 'phaser';
import { Preloader } from './scenes/Preloader';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 800, x:0},
            debug: true, // Cambia a true para ver los contornos de colisión
        },
    },
    scene: [
        Boot,
        Preloader,
        MainGame
    ]
};

const StartGame = (parent: string) => {
    return new Phaser.Game({...config, parent: parent});

}

export default StartGame;
