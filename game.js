class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(400,200, "WALL BALL").setFontSize(200);
        this.add.text(100,500, "Use the left and right arrow key to move").setFontSize(70);
        this.text1 = this.add.text(600,700, "Click anywhere to begin").setFontSize(50);
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
        isGameStarted = false;
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
            this.physics.world.bounds.width / 2, //960,
            this.physics.world.bounds.height - (ball1.body.height / 2 + 1), //1070,
            'paddle'
        );
        paddle1.setImmovable(true);
        paddle1.setCollideWorldBounds(true);
        cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(ball1, paddle1);

        GameOverText = this.add.text(
            150,
            400,
            'GAME OVER',
            {font: "300px"}
        );
        GameOverText.setVisible(false);

        Restart = this.add.text(
            200,
            700,
            'Click anywhere to Restart',
            {font: "100px"}
        );
        this.tweens.add({
            targets: Restart,
                alpha: {from:0, to:1},
                duration: 1950,
                repeat: -1,
        })
        Restart.setVisible(false);
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
            this.score += 10;
            this.scorelabel.text = "SCORE " + this.score;
        }

        if(ball1.body.y > paddle1.body.y) { //ball1.body.blocked.down
            GameOverText.setVisible(true);
            Restart.setVisible(true);
            this.input.on('pointerdown',() => this.scene.restart('game'));
            ball1.setVelocityX(0);
            ball1.setVelocityY(0);
        }
        paddle1.body.setVelocityX(0);

        if (this.score == 10) {
            this.add.ball1
        }

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
let isGameStarted = false;
let ball1;
let paddle1;
let cursors;
let GameOverText;
let Restart;