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
        this.score = 0;
        this.scorelabel = this.add.text(10,10, "SCORE ", {font: "50px"});
        ball1 = this.physics.add.sprite(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2,
            'ball'
        );
        ball1.setCollideWorldBounds(true);
        ball1.setBounce(1, 1);
        paddle1 = this.physics.add.sprite(
            this.physics.world.bounds.width / 2,
            1080,
            'paddle'
        );
        paddle1.setImmovable(true);
        paddle1.setCollideWorldBounds(true);
        cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(ball1, paddle1);
    }
    update() {
        if (!isGameStarted) {
            const initialVelocityX = (Math.random() *100) + 200;
            const initialVelocityY = (Math.random() *100) + 200;
            ball1.setVelocityX(initialVelocityX);
            ball1.setVelocityY(initialVelocityY);
            isGameStarted = true;
        }
        
        if(ball1.body.blocked.up) {
            this.score += 1;
            this.scorelabel.text = "SCORE " + this.score;
        }
        paddle1.body.setVelocityX(0);

        if (cursors.left.isDown) {
            paddle1.body.setVelocityX(-1000);
        }
        if (cursors.right.isDown) {
            paddle1.body.setVelocityX(+1000);
        }
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
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
});
let ball1;
let paddle1;
let isGameStarted = false;
let cursors;
