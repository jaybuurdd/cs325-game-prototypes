


// create a new scene named "Game"
let gameScene = new Phaser.Scene('Game');

// some parameters for our scene (our own customer variables - these are NOT part of the Phaser API)
gameScene.init = function() {
  this.playerSpeed = 2.5;
  this.enemyMaxY = 280;
  this.enemyMinY = 80;
};
  
// load asset files for our game
gameScene.preload = function() {
 
  // load images
  this.load.image('background', 'assets/grass-battle.png');
  this.load.image('player', 'assets/Owlet_Monster.png');
  this.load.image('man', 'assets/Man.png');
  this.load.image('woman', 'assets/Woman.png');
  this.load.image('girl', 'assets/Girl.png');
  this.load.image('boy', 'assets/Boy.png');
  this.load.image('rock', 'assets/Rock2.png');
  
};
 
// executed once, after assets were loaded
gameScene.create = function() {
 
   // background
  let bg = this.add.sprite(0, 0, 'background');
  // change origin to the top-left of the sprite
  bg.setOrigin(0,0);
 

  // player
  this.player = this.add.sprite(40, this.sys.game.config.height / 2, 'player');
  // scale down
  this.player.setScale(1.0);

  // goal
  this.rock = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, 'rock');
  this.rock.setScale(1.0);

  // group of enemies
  this.enemies = this.add.group({
    key: 'man',
    repeat: 4,
    setXY: {
      x: 250,
      y: 200,
      stepX: 100,
      stepY: 20
    }
    
  });

  // scale enemies
  Phaser.Actions.ScaleXY(this.enemies.getChildren(), 1.0, 1.0);

  // set speeds
  Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
    enemy.speed = Math.random() * 2 + 1;
  }, this);

  
  // player is alive
  this.isPlayerAlive = true;

// reset camera effects
this.cameras.main.resetFX();
  
};

// executed on every frame (60 times per second)
gameScene.update = function() {
 
  // only if the player is alive
  if (!this.isPlayerAlive) {
    return;
  }
  // check for active input
  if (this.input.activePointer.isDown) {
 
    // player walks
    this.player.x += this.playerSpeed;
  }

    // treasure collision
  if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.rock.getBounds())) {
    this.gameOver();
    }

  // enemy movement
  let enemies = this.enemies.getChildren();
  let numEnemies = enemies.length;
 
  for (let i = 0; i < numEnemies; i++) {
 
    // move enemies
    enemies[i].y += enemies[i].speed;
 
    // reverse movement if reached the edges
    if (enemies[i].y >= this.enemyMaxY && enemies[i].speed > 0) {
      enemies[i].speed *= -1;
    } else if (enemies[i].y <= this.enemyMinY && enemies[i].speed < 0) {
      enemies[i].speed *= -1;
    }
    // enemy collision
    if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemies[i].getBounds())) {
      this.gameOver();
      break;
    }
  }

      
};

//game over method to end the game
gameScene.gameOver = function() {
 
  // flag to set player is dead
  this.isPlayerAlive = false;
 
  // shake the camera
  this.cameras.main.shake(500);
 
  // fade camera
  this.time.delayedCall(250, function() {
    this.cameras.main.fade(250);
  }, [], this);
 
  // restart game
  this.time.delayedCall(500, function() {
    this.scene.restart();
  }, [], this);
 
  
};
// our game's configuration
let config = {
  type: Phaser.AUTO,  //Phaser will decide how to render our game (WebGL or Canvas)
  width: 800, // game width
  height: 600, // game height
  scene: gameScene // our newly created scene
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);
