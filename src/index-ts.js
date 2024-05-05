import Phaser from "phaser";

// Configuration
// 1440 x 2560 is 9:16 resolution which is closer to the resolution of iPhone devices
// on higher end. At this moment we dont have much experience with mobile browser game
// development, so we will go with this and optimize the resolution for low-end devices.
// Reference: https://www.reddit.com/r/gamedev/comments/aacdib/mobile_game_resolution/
// Since 1440 x 2560 resolution is too large for the laptop, we will be building the game
// for 480 x 800 resolution for now.

const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 800,
  physics: { default: "arcade" },
  scene: { preload, create },
};

// Loading Assets: Images, Music, Animations etc
function preload() {
  // "this" context - scene
  // contains functions and properties
  // can be viewed by typing "this" and pressing "enter" on console when game is loaded

  this.load.image("bg", "assets/ts_bg.png");
}

// Initializing Instances of Objects
function create() {
  this.add.image(config.width / 2, config.height / 2, "bg");
}

new Phaser.Game(config);
