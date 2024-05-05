import Phaser from "phaser";

/**
 * NOTES:
 * - In current version, keyword for detecting keyboard events is changed. Instead of keydown_SPACE, now keydown-SPACE is used.
 * -  Refer to https://newdocs.phaser.io/docs/3.80.0/Phaser.Input.Keyboard.Events.KEY_DOWN
 *
 *
 */

const config = {
  type: Phaser.AUTO, //By Default used WebGL (Web Graphics Library)
  width: 800,
  height: 600,
  physics: {
    default: "arcade", // Arcade Physics Plugin manages Physics Simulation
    arcade: {
      debug: true,
      gravity: { y: 200 }, // 200 => 200 pixels/s^2
    },
  },
  scene: {
    preload,
    create,
    update,
  },
};

let bird = null;
const VELOCITY = 200;
/**
 * @param {Object} birdInitialPosition initial position of the bird
 */
const birdInitialPosition = {
  /**
   * @param {number} xPos x coordinate of the bird's initial position
   * @param {number} yPos y coordinate of the bird's initial position
   */
  xPos: config.width / 10,
  yPos: config.height / 2,
};

// Loading Assets: Images, Music, Animations etc
function preload() {
  // 'this' context - scene
  // contains functions and properties

  this.load.image("sky", "assets/sky.png");
  this.load.image("bird", "assets/bird.png");
}

// Initializing Instances of the Objects
function create() {
  this.add.image(0, 0, "sky").setOrigin(0, 0);

  bird = this.physics.add
    .sprite(birdInitialPosition.xPos, birdInitialPosition.yPos, "bird")
    .setOrigin(0);
  // bird.body.velocity.x = VELOCITY;

  // Detect Mouse Input
  this.input.on("pointerdown", flap);

  this.input.keyboard.on("keydown-SPACE", flap);
}

// update function is called every frame
// The code runs at 60 fps
function update(time, delta) {}

function flap() {
  bird.body.velocity.y = -VELOCITY;
}

function reset_pos(bird_x_pos) {
  if (bird_x_pos >= config.width) {
    console.log(`Bird went out of canvas`);
    bird.setPosition(birdInitialPosition.xPos, birdInitialPosition.yPos);
  }
}

/**
 * Reverse the direction of the bird movement when bird reaches the canvas bounds.
 * @param {number} bird_x_pos x coordinate of the bird position
 */
function reverse_move_direction(bird_x_pos) {
  if (bird_x_pos >= config.width - bird.width) {
    bird.body.velocity.x = -VELOCITY;
  } else if (bird_x_pos <= 0) {
    bird.body.velocity.x = VELOCITY;
  }
}

new Phaser.Game(config);
