import Phaser from 'phaser'
import * as Colyseus from "colyseus.js";

export default class HelloWorldScene extends Phaser.Scene
{// get `roomId` from the query string
    private roomId?: string;
    private client?: Colyseus.Client; 
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private player?: Phaser.Physics.Arcade.Sprite;
    private stars?: Phaser.Physics.Arcade.Group;
    private bombs?: Phaser.Physics.Arcade.Group;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    private score = 0;
    private scoreText?: Phaser.GameObjects.Text;
    private infoText?: Phaser.GameObjects.Text;

    private gameOver = false;

	constructor()
	{
		super('hello-world')
	}

    init()
    {
        this.client = new Colyseus.Client('ws://localhost:2567');
    }

	preload()
    {
        this.load.image('sky', 'assets/sky.png');
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            this.infoText = this.add.text(350,200,`Only Desktop Devices are Allowed`,{ fontSize: '16px', color: '#fff' });
		}else if(/Opera Mini/i.test(navigator.userAgent)){
            this.infoText = this.add.text(350,200,`Only Desktop Devices are Allowed`,{ fontSize: '16px', color: '#fff' });
		}else{
            this.load.image('ground', 'assets/platform.png');
            this.load.image('star', 'assets/star.png');
            this.load.image('bomb', 'assets/bomb.png');
            this.load.spritesheet('dude','assets/dude.png',{
                frameWidth:32, frameHeight:48
            });
        }
    }

    async create()
    {
        const room = await this.client?.joinOrCreate('my_room');
        console.log(room);

        room?.onMessage('keydown', (message)  => {
            console.log(message);
        })

        this.input.keyboard.on('keydown',(evt: KeyboardEvent) => {
            room?.send('keydown', evt.key);
        })
        
        this.add.image(400, 300, 'sky');

        this.platforms = this.physics.add.staticGroup();
        const group: Phaser.Physics.Arcade.Sprite = this.platforms.create(400, 568, 'ground');
        group.setScale(2).refreshBody();

        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        this.player = this.physics.add.sprite(100,450,'dude');

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(this.player, this.platforms);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        
        this.stars.children.iterate((c) => {
            const child = c as Phaser.Physics.Arcade.Image;
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        
        });

        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, undefined, this);

        this.scoreText = this.add.text(16,16,`Score : ${this.score}`,{ fontSize: '32px', color: '#000' });

        this.bombs = this.physics.add.group();
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, undefined, this);

    }

    private hitBomb = (player:Phaser.GameObjects.GameObject, b:Phaser.GameObjects.GameObject) => {

        this.physics.pause();
        this.player?.setTint(0xff0000);

        this.player?.anims.play('turn');

        this.gameOver = true;
    }

    private collectStar(player:Phaser.GameObjects.GameObject, s:Phaser.GameObjects.GameObject){
        const star = s as Phaser.Physics.Arcade.Image;
        star.disableBody(true, true);

        this.score += 1;
        this.scoreText?.setText(`Score : ${this.score}`);

        if (this.stars?.countActive(true) === 0) {
            this.stars.children.iterate((c) => {
                const child = c as Phaser.Physics.Arcade.Image;
                child.enableBody(true, child.x,0,true,true);
            });

            if (this.player) {
                const x = this.player.x < 400 
                    ? Phaser.Math.Between(400, 800)
                    : Phaser.Math.Between(0, 400)
                const bomb:Phaser.Physics.Arcade.Image = this.bombs?.create(x, 16, 'bomb')
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true)
                bomb.setVelocity(Phaser.Math.Between(-200,200),20);
            }
        }
    }

    update() {
        if (!this.cursors) {
            return
        }
        if (this.cursors.left?.isDown)
        {
            this.player?.setVelocityX(-160);

            this.player?.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player?.setVelocityX(160);

            this.player?.anims.play('right', true);
        }
        else
        {
            this.player?.setVelocityX(0);

            this.player?.anims.play('turn');
        }

        if (this.cursors.space.isDown && this.player?.body.touching.down)
        {
            this.player?.setVelocityY(-330);
        }
    }
}
