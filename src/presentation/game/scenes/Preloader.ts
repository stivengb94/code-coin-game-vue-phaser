import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets/game');

        this.load.image('platform', 'platforms/platform1.jpeg');
        this.load.image("bush", "others/hills.png");
        this.load.image("python", "others/python_platform.png");
        this.load.image("sql", "others/sql_platform.png");
        this.load.image("java", "others/java_platform.png");


        this.load.image("coin", "others/money.png");
        this.load.image("coin-python", "others/money-python.png");
        this.load.image("coin-sql", "others/money-sql.png");
        this.load.image("coin-java", "others/money-java.png");
        this.load.image("flag-pole", "goal/flagPole.png");

        this.load.image("bgCloud", "bg/bg3.jpg");

        this.load.spritesheet("dude", "players/dude.png", {
            frameWidth: 32,
            frameHeight: 48,
        });

        this.load.spritesheet("person", "players/person.png", {
            frameWidth: 135,
            frameHeight: 203,
        });
    }

    create ()
    {
        this.scene.start('Game');
    }
}
