/*
Jumper game with a character that's dodgin a laser shooting eyeball.
TO DO:
switch assets
code collision (user DA2 code)
code jumping physics for character (challenging part?)
*/


var config = {
  type: Phaser.AUTO,
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

var bullet;
var speed;


var game = new Phaser.Game(config);

function preload ()
{
  this.load.image('bullet', 'assets/adventurer-attack1-00.png');
  this.load.image('cannon', 'assets/flying-eyeball.png');
  this.load.image('ground', 'assets/Tileset_Surface.png');
}

function create ()
{
  //   Bullet 1 (600px in 6 seconds)

  this.add.image(0, 200, 'ground').setOrigin(0);

  bullet = this.add.image(64, 76, 'bullet').setOrigin(0);

  speed = Phaser.Math.GetSpeed(600, 6);

  this.add.image(64, 72, 'cannon').setOrigin(0);

  this.add.text(64, 50, '600px / 6 secs', { fill: '#000' });

  //   Bullet 2 (600px in 3 seconds)


}

//  The update function is passed 2 values:
//  The current time (in ms)
//  And the delta time, which is derived from the elapsed time since the last frame, with some smoothing and range clamping applied

function update (time, delta)
{
  bullet.x += speed * delta;

  if (bullet.x > 864)
  {
      bullet.x = 64;
  }


}
