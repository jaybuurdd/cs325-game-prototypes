import "./phaser.js";
//import { Phaser } from "./phaser.js";

// You can copy-and-paste the code from any of the examples at https://examples.phaser.io here.
// You will need to change the `parent` parameter passed to `new Phaser.Game()` from
// `phaser-example` to `game`, which is the id of the HTML element where we
// want the game to go.
// The assets (and code) can be found at: https://github.com/photonstorm/phaser3-examples
// You will need to change the paths you pass to `this.load.image()` or any other
// loading functions to reflect where you are putting the assets.
// All loading functions will typically all be found inside `preload()`.

// The simplest class example: https://phaser.io/examples/v3/view/scenes/scene-from-es6-class

class MyScene extends Phaser.Scene {
    

    constructor() 
    {
        super();
        this.move = 0;
        this.x = 0;
        this.y = 0;
    
        var sprites = [];
   
    }
    
    
    preload() {
        // Load an image and call it 'logo'.
        this.load.image( 'background', 'assets/parallax-mountain-bg.png' );
        this.load.image('sword', 'assets/sword_spin.gif' )
        this.load.image('rock', 'assets/rock.png')
        this.load.image('rock-off', 'assets/rock1.png')

        this.load.audio('sound', 'assets/adventure.wav')
    }
    
    create() {
        
        const sound = this.sound.add("sound");
        sound.play();
        const bg = this.add.image(0, 0, 'background');
        const sword = this.add.image(0, 0, 'sword');
        //var rock6 = this.add.sprite(300, 300, 'rock');
        const text = this.add.text(350, 250, '', { font: '24px Courier', fill: '#00ff00' });
        

        this.cameras.main.once('camerafadeincomplete', function (camera) {
            camera.fadeOut(90000);
        });
        
        this.cameras.main.fadeIn(6000);
        //  Center the picture in the game
        Phaser.Display.Align.In.Center(bg, this.add.zone(400, 300, 800, 600));

        //  Center the sprite to the picture
        Phaser.Display.Align.In.Center(sword, bg)
        
    

        var pos = Phaser.Geom.Rectangle.Random(this.physics.world.bounds);
            
        var block = this.physics.add.image(pos.x, pos.y, 'rock-off');
        var block1 = this.physics.add.image(pos.x, pos.y, 'rock-off');
        var block2 = this.physics.add.image(pos.x, pos.y, 'rock-off');
        var block3 = this.physics.add.image(pos.x, pos.y, 'rock-off');
        var block4 = this.physics.add.image(pos.x, pos.y, 'rock-off');
        var block5 = this.physics.add.image(pos.x, pos.y, 'rock-off');
        var rock6 = this.physics.add.image(pos.x, pos.y, 'rock-off');
            

        //const rock6 = this.add.image(300, 300, 'rock6');

        //  Store some data about this rock6:
        rock6.setDataEnabled();

        rock6.data.set('howto', 'Collect 50,000 points! \n\n');
        rock6.data.set('rule', 'CLICK THE ROCKS!\n' + "Quick! Before the swords\n" + "power overwhelms you!\n\n\n\n\n\n");
        rock6.data.set('point', 0);

        text.setText([
            
            'HOW TO: ' + rock6.data.get('howto'),
            'RULE: ' + rock6.data.get('rule'),
            'SCORE: ' + rock6.data.get('point') + ' points'
            
        ]);

        //  Whenever the 'point' property is updated we call this function AFTER the change has happened:
        rock6.on('changedata-point', function (gameObject, value) {
            if (value > 500)
            {
                gameObject.data.values.point = 500;
            }
            else
            {
                text.setText([
                    'HOW TO: ' + rock6.data.get('howto'),
                    'RULE: ' + rock6.data.get('rule'),
                    'SCORE: ' + rock6.data.get('point') + ' points'
                ]);
            }
        });

        //Change the 'value' property when the mouse is clicked
        this.input.on('pointerdown', function () {
            rock6.data.values.point += 100;
            

        });///////////////////////////////

            block.setBounce(1).setCollideWorldBounds(true);
            block1.setBounce(1).setCollideWorldBounds(true);
            block2.setBounce(1).setCollideWorldBounds(true);
            block3.setBounce(1).setCollideWorldBounds(true);
            block4.setBounce(1).setCollideWorldBounds(true);
            block5.setBounce(1).setCollideWorldBounds(true);
            rock6.setBounce(1).setCollideWorldBounds(true);
    
            Phaser.Math.RandomXY(block.body.velocity, 500);
            Phaser.Math.RandomXY(block1.body.velocity, 500);
            Phaser.Math.RandomXY(block2.body.velocity, 500);
            Phaser.Math.RandomXY(block3.body.velocity, 500);
            Phaser.Math.RandomXY(block4.body.velocity, 500);
            Phaser.Math.RandomXY(block5.body.velocity, 500);
            Phaser.Math.RandomXY(rock6.body.velocity, 500);
    
            sprites.push(block);
            sprites.push(block1);
            sprites.push(block2);
            sprites.push(block3);
            sprites.push(block4);
            sprites.push(block5);
            sprites.push(rock6);


        
    }
    
    update(){
        
    }  


}
    

const game = new Phaser.Game({
    type: Phaser.WEBGL,
    parent: 'game',
    width: 800,
    height: 600,
    scene: MyScene, 
    physics: { default: 'arcade' ,
    arcade: {
        gravity: { y: -200 },
        debug: false
    }
   
}


    });
