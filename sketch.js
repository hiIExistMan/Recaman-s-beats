let sequence = [];
let landed = [true];
let count = 1;
let current = 0;
let osc, env;

function setup() {
  createCanvas(windowWidth, windowHeight);
  setInterval(step, 250);
  osc = new p5.Oscillator();
  osc.start();
  env = new p5.Env();
  env.setADSR(0.5, 0.2, 0.5, 0.2);
  env.setRange(1, 0);
  osc.amp(env);
  //env.play();
}

function draw() {
  background(0);
  textAlign(CENTER, CENTER);
  textSize(256);
  fill(255);
  noStroke();
  text(current, width / 2, height / 2);
}

function step() {
  let next = current - count;
  if (next < 0 || landed[next]) next = current + count;
  current = next;
  landed[next] = true;
  count++;
  const freq = map(next%12, 0, 12, 32, 440);
  const amp = map(next%20, 0, 20, 0, 1);
  const A = map(next%100, 0, 100, 0, 1);
  env.setADSR(A, 0.2, 0.5, 0.2);
  osc.freq(freq);
  osc.amp(amp);
  env.play();
}
