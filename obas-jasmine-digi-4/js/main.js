var config = {
  type: Phaser.CANVAS,
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
      create: create,
      update: update
  }
};

var blast;
var speed;
var player;
var cursors;
var leftKeyDebug;
var rightKeyDebug;
var upKeyDebug;
var downKeyDebug;


var game = new Phaser.Game(config);


function preload ()
{
  this.load.image('player', 'assets/adventurer-attack1-00.png');
  this.load.image('blast', 'assets/eye-ball-blast.png');
  this.load.image('enemy', 'assets/evil-eye-ball.png');
  this.load.image('ground', 'assets/ground_mossy.png');
  //this.load.image('sky', 'assets/BGFront.png');
  this.load.image('background', 'assets/CloudsBack.png');
}

function create ()
{
  cursors = this.input.keyboard.createCursorKeys();

  // create the player sprite    
  player = this.physics.add.sprite(600, 600, 'player').setOrigin(1, 4); 
  player.flipX=true;
  // scale down
  player.setScale(2.5);
  player.setBounce(0.2); // our player will bounce from items
  player.setCollideWorldBounds(true); // don't go out of the map


  // create enemy sprite
  eyeball = this.add.image(64, 600, 'enemy').setOrigin(1, 4);

  eyeball.flipX=true; //flip image

  // eyeball blast (enemy attack)
  blast = this.add.image(64, 455, 'blast').setOrigin(0);
  blast.flipX=true;
  speed = Phaser.Math.GetSpeed(600, 3);
  // coin image used as tileset
  
  
  this.add.image(0, 580, 'ground').setOrigin(0);
  this.add.image(100, 580, 'ground').setOrigin(0);
  this.add.image(200, 580, 'ground').setOrigin(0);
  this.add.image(300, 580, 'ground').setOrigin(0);
  this.add.image(400, 580, 'ground').setOrigin(0);


 
  leftKeyDebug = this.add.text(10, 300);
  rightKeyDebug = this.add.text(570, 300);
  upKeyDebug = this.add.text(300, 10);
  downKeyDebug = this.add.text(300, 530);

  //scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
  //this.physics.add.overlap(player, blast);
  // player is alive
  this.isPlayerAlive = true;

 // reset camera effects
  this.cameras.main.resetFX();
 
  
}


//  The update function is passed 2 values:
//  The current time (in ms)
//  And the delta time, which is derived from the elapsed time since the last frame, with some smoothing and range clamping applied

function update (time, delta)
{
  // only if the player is alive
  if (!this.isPlayerAlive) {
      return;
  }
  blast.x += speed * delta;

  if (blast.x > 864)
  {
      blast.x = 64;
  }

  player.setVelocity(0);

  if (cursors.left.isDown)
  {
      player.setVelocityX(-300);
  }
  else if (cursors.right.isDown)
  {
      player.setVelocityX(300);
  }

  if (cursors.up.isDown)
  {
      player.setVelocityY(-300);
  }
  else if (cursors.down.isDown)
  {
      player.setVelocityY(300);
  }
 
}


 

