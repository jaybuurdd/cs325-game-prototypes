const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 500 }, // will affect our player sprite
        debug: false // change if you need
    }
  },
  backgroundColor: '#9adaea',
  useTicker: true,
  scene: {
      preload: preload,
      create: create
  }
};

var game = new Phaser.Game(config);


function preload ()
{
  
  this.load.image('sky', 'assets/night-sky.png');
  this.load.image('bird', 'assets/adventurer-attack1-00.png');

}

let bird = null;

function create ()
{
  //this.add.image(400, 400, 'sky');
  this.add.image(0, 0, 'sky').setOrigin(0);
  //this.add.image(config.width / 2, config.height / 2, 'sky');

  //middle of the height
  bird = this.add.sprite(config.width * 0.1, config.height / 2, 'bird').setOrigin(0)

  debugger
  
}

