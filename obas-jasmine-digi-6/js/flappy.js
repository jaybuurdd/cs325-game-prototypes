//import Phaser from 'phaser';
import PlayScene from './scenes/PlayScene.js';


const WIDTH = 800;
const HEIGHT = 600;
const BIRD_POS = {x: WIDTH * 0.1, y: HEIGHT / 2};

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: BIRD_POS
}

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
      debug:true,
    }
  },
  scene: [new PlayScene(SHARED_CONFIG)]   
  }

  
  new Phaser.Game(config);