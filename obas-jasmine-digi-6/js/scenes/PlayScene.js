//import Phaser from 'Phaser';
const PIPES_TO_RENDER = 4;


class PlayScene extends Phaser.Scene {
  
    constructor(config){
        super('PlayScene');

        this.config = config;
        this.bird = null;
        this.pipes = null;

        this.pipeHorizontalDistance = 0;

        this.pipeVerticalDistanceRange = [250, 400];
        this.pipeHorizontalDistanceRange = [500, 550];
        //let pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
        //let pipeVerticalPosition = Phaser.Math.Between(0 + 20, config.height - 20 - pipeVerticalDistance);
        this.flapVelocity = 300;

        this.score = 0;
        this.scoreText = '';
        
    }
    
    preload(){
        this.load.image('sky', 'assets/night-sky.png');
        this.load.image('bird', 'assets/bird.png');
        this.load.image('pipe', 'assets/pipe.png');
        this.load.audio('music', 'assets/bensound-extremeaction.mp3');
    }

    create(){
        //debugger
        
         
        this.createBackground();
        this.createBird();
        this.createPipes();
        this.createColliders();
        this.createScore();
        this.handleInputs();
    }

    update(){
        this.checkGameStatus();
        this.recyclePipes();
    }

    createBackground(){
        this.add.image(0, 0, 'sky').setOrigin(0);
        //const music = this.sound.add('music');
        //music.play();
        
        
       
    }

    createBird(){

        this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y,'bird').setOrigin(0);
        this.bird.flipX=true;
        this.bird.body.gravity.y = 600;
        this.bird.setCollideWorldBounds(true);

    }

    createPipes(){

        this.pipes = this.physics.add.group();

        for (let i = 0; i < PIPES_TO_RENDER; i++) {
      
        const upperPipe = this.pipes.create(0, 0, 'pipe')
        .setImmovable(false)
        .setOrigin(0, 1);
        upperPipe.flipY = true;
        const lowerPipe = this.pipes.create(0, 0, 'pipe')
        .setImmovable(false)
        .setOrigin(0, 0);
      
        this.placePipe(upperPipe, lowerPipe);
        }
    }

    createColliders(){
        this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);
    }

    createScore(){
        this.score = 0;
        const bestScore = localStorage.getItem('bestScore');
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFFFFF'});
        this.add.text(16, 52, `Best score: ${bestScore || 0}`, { fontSize: '18px', fill: '#FFFFFF'});
    }

    handleInputs(){
        this.input.on('pointerdown', this.flap, this);
        //this.input.keyboard.on('keyadown_SPACE', flap);
    }

    checkGameStatus(){
        if (this.bird.getBounds().bottom >= this.config.height || this.bird.y <= 0){
            this.gameOver();
            
          }
        
   
    }

    placePipe(uPipe, lPipe){
        const rightMostX = this.getRightMostPipe();
        const pipeVerticalDistance = Phaser.Math.Between(...this.pipeVerticalDistanceRange);
        const pipeVerticalPosition = Phaser.Math.Between(0 + 20, this.config.height - 20 - pipeVerticalDistance);
        const pipeHorizontalDistance = Phaser.Math.Between(...this.pipeHorizontalDistanceRange);
      
        uPipe.x = rightMostX + pipeHorizontalDistance;
        uPipe.y = pipeVerticalPosition;
      
        lPipe.x = uPipe.x;
        lPipe.y = uPipe.y + pipeVerticalDistance;
      
        lPipe.body.velocity.x = -450;
        uPipe.body.velocity.x = -450;

    }

    recyclePipes(){
        const tmpPipes = [];
        this.pipes.getChildren().forEach(pipe => {
          if (pipe.getBounds().right <= 0) {
            tmpPipes.push(pipe);
            if(tmpPipes.length === 2){
              this.placePipe(...tmpPipes);
              this.increaseScore();
              this.saveBestScore();
            }
          }
        })
      }

      getRightMostPipe(){
        let rightMostX = 0;
      
        this.pipes.getChildren().forEach(function(pipe){
          rightMostX = Math.max(pipe.x, rightMostX);
        })
      
        return rightMostX;
      }

     

      saveBestScore(){
          const bestScoreText = localStorage.getItem('bestScore');
          const bestScore = bestScoreText && parseInt(bestScoreText, 10);

          if(!bestScore || this.score > bestScore){
              localStorage.setItem('bestScore', this.score);
          }
      }


       gameOver() {
        this.physics.pause();
        this.bird.setTint(0xEE4824);
        //this.music.restart();
        
        this.saveBestScore();
        
       
        this.time.addEvent({
            
            delay: 1000,
            callback: () => {
                this.scene.restart();
                
                
            },
            loop: false
        })
       
      }

      flap() {
        this.bird.body.velocity.y = -this.flapVelocity
    }

    increaseScore(){
        this.score++;
        this.scoreText.setText(`Score: ${this.score}`)
    }
      
}

export default PlayScene;
