class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(400,100, "WALL BALL").setFontSize(200);
        this.text1 = this.add.text(600,800, "Click anywhere to begin").setFontSize(50);
        this.tweens.add({
            targets: this.text1,
                alpha: {from:0, to:1},
                duration: 1950,
                repeat: -1,
        })        
        this.input.on('pointerdown',() => this.scene.start('game'));
    }
}

class Game extends Phaser.Scene {
    constructor() {
        super('game')
    }
    preload(){
        this.load.image('ball', 'assets/ball.png');
        this.load.image('paddle', 'assets/paddle.png');
    }
    create() {
        this.rectangle1 = this.add.rectangle(1620,540,600,1080,'0xADD8E6');
    }
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Game], //Intro, Game
    title: "Wall Ball Game",
});