let ponts = [];
let song;
let projected = [];
let angle = 0;
let pos = 0;
let a = 1;
let b = 4;
let face, spinner;


const X = 0,
  Y = 1,
  Z = 2,
  W = 3,
  scl = 75;
let speed, theta, color1, color2, color3 = 0;
let permutations = [];
let order;
var maxColorValue = 255;
var minColorValue = 0;
var ballcolor;
let love, live;
let video;
var state = 0;
var state2 = 0;
var boom, boomx, boomy = 0;

function preload() {
  //louding 3d models and song
  face = loadModel('faceMesh.obj', true);
  mySound = loadSound('song1.mp3');
  video = createVideo('video3.mp4');
  video.volume(0);
  video.hide();




}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  mySound.setVolume(2);


  //play song
  mySound.play();
  mySound.loop();
  live = createGraphics(300, 300);
  live.fill(255);
  live.textAlign(CENTER);
  live.textSize(25);
  live.text('E.C.C.O', 100, 100, 200, 100);

  live.text('LOST DREAMS SOUNDS ', 150, 150);
  //create text rotating on screen
  love = createGraphics(300, 300);
  love.fill(255);
  love.textAlign(CENTER);
  love.textSize(18);
  love.text('PRESS THE UPPER&LEFT ARROW ', 170, 260);
  //points on the 4d cube
  rotateX(40);
  ponts[0] = create4dVector(-1, -1, -1, 1);
  ponts[1] = create4dVector(1, -1, -1, 1);
  ponts[2] = create4dVector(1, 1, -1, 1);
  ponts[3] = create4dVector(-1, 1, -1, 1);
  ponts[4] = create4dVector(-1, -1, 1, 1);
  ponts[5] = create4dVector(1, -1, 1, 1);
  ponts[6] = create4dVector(1, 1, 1, 1);
  ponts[7] = create4dVector(-1, 1, 1, 1);
  ponts[8] = create4dVector(-1, -1, -1, -1);
  ponts[9] = create4dVector(1, -1, -1, -1);
  ponts[10] = create4dVector(1, 1, -1, -1);
  ponts[11] = create4dVector(-1, 1, -1, -1);
  ponts[12] = create4dVector(-1, -1, 1, -1);
  ponts[13] = create4dVector(1, -1, 1, -1);
  ponts[14] = create4dVector(1, 1, 1, -1);
  ponts[15] = create4dVector(-1, 1, 1, -1);
  speed = radians(1);
  permutations = [
    [X, Y],
    [X, Z],
    [X, W],
    [Y, Z],
    [Y, W],
    [Z, W]
  ];

}

function create4dVector(x, y, z, w) {
  let temp = createVector(x, y, z)
  temp.w = w;
  return temp
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  video.play();
  video.loop();

  //map mouse to background color
  background(
    map(mouseX, 0, width, maxColorValue, minColorValue),
    map(mouseY, 0, height, 80, minColorValue),
    map(mouseX, 0, height, minColorValue, maxColorValue)
  );

  order = [a, b];
  noStroke();
  //map ambient light to mouse
  ambientLight(map(mouseX, 0, width, maxColorValue, minColorValue),
    map(mouseY, 0, height, maxColorValue, minColorValue),
    map(mouseX, 0, height, minColorValue, maxColorValue));
  //map point light to mouseX
  pointLight(255, 255, 255);
  for (let i = 0; i < ponts.length; i++) {
    let p = ponts[i];
    let pt = Matrix.fromVec(p);


    for (let j = 0; j < order.length; j++) {
      pt = Matrix.multiply(Matrix.rotation(permutations[order[j]][0], permutations[order[j]][1], 4, theta), pt)
    }



    pt = Matrix.multiply(Matrix.perspective(4, 2, pt.toVec.w), pt)

    pt = pt.toVec.mult(scl);

    projected[i] = (pt);
    //Change the permutation order
    if (state2 == 0) {
      a = 1;
      b = 4;
    } else if (state2 == 1) {
      a = 2;
      b = 4;
    } else if (state2 == 2) {
      a = 4;
      b = 5;
    } else if (state2 == 3) {
      a = 3;
      b = 4;
    }
    directionalLight(18, 20, 18, 200, -4000, -100)
    // draw the spheres
    if (state == 0) {
      push();
      translate(pt.x, pt.y, pt.z);
      translate(0, -200, 0);

      ballcolor = map(mouseY, 0, height, maxColorValue, minColorValue);
      ambientMaterial(ballcolor);
      sphere(5);
      pop();
    } else if (state == 1) {
      //shake the balls
      push();
      translate(pt.x, pt.y, pt.z);
      translate(boomx, -200, boomy);
      ballcolor = map(mouseY, 0, height, maxColorValue, minColorValue);
      ambientMaterial(ballcolor);
      sphere(5);
      boom = random(0, 10);
      boomx = random(0, 15);
      boomy = random(0, 5);
      pop();
    } else if (state == 2) {
      push();
      translate(pt.x, pt.y, pt.z);
      translate(boomx, -200, boomy);
      ballcolor = map(mouseY, 0, height, maxColorValue, minColorValue);
      ambientMaterial(ballcolor);
      sphere(5);
      boom = random(0, 1000);
      boomx = random(0, 150);
      boomy = random(0, 50);
      pop();
    } else if (state == 3) {
      //make the spheres go away
      push()
      translate(pt.x + boomx, pt.y + boomy, pt.z + boom);
      ballcolor = map(mouseY, 0, height, maxColorValue, minColorValue);
      ambientMaterial(ballcolor);
      sphere(5);
      boom = boom + 1;

      boomx = boomx + 1;
      boomy = boomy + 0.3;
      pop();
    }
  }
  //control the movement of the 4d cube with the mouseX
  theta = map(mouseX, 0, width, 0, TWO_PI);



  fill(250, 0, 0);
  //connect the 4d spheres
  for (let i = 0; i < 4; i++) {
    connect(0, i, (i + 1) % 4, projected);
    connect(0, i + 4, ((i + 1) % 4) + 4, projected);
    connect(0, i, i + 4, projected);
  }

  for (let i = 0; i < 4; i++) {
    connect(8, i, (i + 1) % 4, projected);
    connect(8, i + 4, ((i + 1) % 4) + 4, projected);
    connect(8, i, i + 4, projected);
  }

  for (let i = 0; i < 8; i++) {
    connect(0, i, i + 8, projected);
  }
  //video
  translate(00, 0, -2000);
  ambientMaterial(255, 0, 0);
  noStroke();
  texture(video);
  plane(windowWidth * 4, windowHeight * 4);

  normalMaterial(255);
  translate(-1000, 0, 1400);
  //rotateX(angle*2);
  texture(live);
  plane(300, 100);




  //face
  //rotateX(-angle*2);

  scale(10, 10, 2);
  translate(100, -5, -600);
  ambientMaterial(255, 255, 255);
  rotateZ(radians(180));
  model(face);
  //box rotating with text
  translate(-100, 0, 200)
  normalMaterial(255, 0, 255)
  rotateY(angle * 0.3);
  rotateZ(angle * 0.7);
  rotateX(angle * 20);
  angle = angle + 0.002;
  texture(love);
  translate(00, 10, 0);
  strokeWeight(2);
  box(100);

}

function connect(offset, i, j, ponts) {
  strokeWeight(2);
  stroke(255);
  const a = ponts[i + offset];
  const b = ponts[j + offset];
  line(a.x, a.y - 200, a.z, b.x, b.y - 200, b.z);
}
//change state with the upper and left arrow
function keyPressed() {
  if (keyCode === UP_ARROW) {
    state = state + 1;
    if (state == 4) {
      state = 0;
    }
  }
  if (keyCode === LEFT_ARROW) {
    state2 = state2 + 1;
    if (state2 == 4) {
      state2 = 0;
    }
  }
  return false;
}
