var config = {
  type: Phaser.CANVAS,
  width: 800,
  height: 600,
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

var game = new Phaser.Game(config);

function preload ()
{
  this.load.image('player', 'assets/adventurer-attack1-00.png');
  this.load.image('blast', 'assets/eye-ball-blast.png');
  this.load.image('enemy', 'assets/evil-eye-ball.png');
  this.load.image('ground', 'assets/BGFront.png');
  this.load.image('background', 'assets/CloudsBack.png');
}

function create ()
{

  // enemy eyeball blast

  this.add.image(0, 500, 'ground').setOrigin(0);

  blast = this.add.image(64, 376, 'blast').setOrigin(0);
  blast.flipX=true;

  speed = Phaser.Math.GetSpeed(600, 3);

  eyeball = this.add.image(64, 500, 'enemy').setOrigin(1, 4);
  eyeball.flipX=true; //flip image

  this.add.text(64, 350, '600px / 3 secs', { fill: '#000' });
}

//  The update function is passed 2 values:
//  The current time (in ms)
//  And the delta time, which is derived from the elapsed time since the last frame, with some smoothing and range clamping applied

function update (time, delta)
{

  blast.x += speed * delta;

  if (blast.x > 864)
  {
      blast.x = 64;
  }
}