import "./phaser.js";
import { Phaser } from "./phaser.js";

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
    }
    
    preload() {
        // Load an image and call it 'logo'.
        this.load.image( 'background', 'assets/parallax-mountain-bg.png' );
        this.load.image('sword', 'assets/sword_spin.gif' )
    }
    
    create() {
        //set background size to fit gaming window
        const back_img = this.add.image(0, 0, 'background');
        
        //Center the picture in game
        Phaser.Display.Align.In.Center(back_img, this.add.zone(400,300,800,600));
        
        //sword
        this.group = this.add.group({key: 'sword', frameQuantity: 128});
        this.input.on('pointermove', function (pointer){
            this.x = pointer.x;
            this.y = pointer.y;
        }, this);

   
    }
    
    
    
    update(time, delta) {
      this.move += delta;
      if(this.move > 6)
      {
          Phaser.Actions.ShiftPosition(this.group.getChildren(), this.x, this.y);
          this.move = 0;
      }  

    }
}
    

const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scene: MyScene,
    physics: { default: 'arcade' },
    });
