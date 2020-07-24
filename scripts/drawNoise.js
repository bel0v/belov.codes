import perlin from "./perlinOriginal.js";
/* eslint-disable no-mixed-operators */
/* eslint-disable no-magic-numbers */

let animationFrame;

function main() {
  const WIDTH = window.innerWidth;
  const HEIGHT = window.innerHeight;

  /* Main canvas */
  const mainCanvas = document.getElementById("theCanvas");
  mainCanvas.width = WIDTH;
  mainCanvas.height = HEIGHT;
  const mainCtx = mainCanvas.getContext("2d");
  mainCtx.lineJoin = mainCtx.lineCap = "round";
  mainCtx.lineWidth = 1;

  /* Mask canvas
  - to clip the path inner part out of main canvas
  */
  const maskCanvas = document.createElement("canvas");
  maskCanvas.width = WIDTH;
  maskCanvas.height = HEIGHT;
  const maskCtx = maskCanvas.getContext("2d");
  maskCtx.fillStyle = "white";
  maskCtx.globalCompositeOperation = "xor";

  /* Text canvas
  - move text out to separate canvas for better rendering
  */
  const textCanvas1 = document.createElement("canvas");
  textCanvas1.width = WIDTH;
  textCanvas1.height = HEIGHT;
  const textCtx1 = textCanvas1.getContext("2d");
  textCtx1.font = "30px Courier New";
  textCtx1.textAlign = "center";
  textCtx1.textBaseline = "middle";
  textCtx1.fillText(
    "COMING SOON",
    textCanvas1.width / 2,
    textCanvas1.height / 2
  );

  let time = 0;

  const DOTS_NUM = 500;

  function drawNoise() {
    maskCtx.clearRect(0, 0, WIDTH, HEIGHT);
    maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
    mainCtx.clearRect(0, 0, WIDTH, HEIGHT);
    maskCtx.save();
    maskCtx.translate(WIDTH / 2, HEIGHT / 2);
    maskCtx.beginPath();
    for (let i = 0; i < DOTS_NUM; i += 1) {
      const angle = (i * 2 * Math.PI) / DOTS_NUM;
      const radius = 100;
      const x =
        radius *
        Math.sin(angle) *
        2 *
        perlin(1 * Math.sin(angle) + time / 100, time / 100);
      const y =
        radius *
        Math.cos(angle) *
        2 *
        perlin(1 * Math.cos(angle) + time / 100, time / 100);
      maskCtx.lineTo(x, y);
    }
    maskCtx.closePath();
    maskCtx.fill();
    maskCtx.restore();
  }

  function draw() {
    drawNoise();
    // fill main canvas background
    mainCtx.fillStyle = "magenta";
    mainCtx.fillRect(0, 0, WIDTH, HEIGHT);
    mainCtx.fillStyle = "#3b003b";
    maskCtx.font = "30px Courier New";
    maskCtx.textAlign = "center";
    maskCtx.textBaseline = "middle";
    maskCtx.fillText("coming soon", WIDTH / 2 + 12, HEIGHT / 2 + 12);
    mainCtx.drawImage(textCanvas1, 0, 0, WIDTH, HEIGHT);
    mainCtx.drawImage(maskCanvas, 0, 0);
  }

  function render() {
    draw();
    time += 1;
    animationFrame = window.requestAnimationFrame(render);
  }
  render();
}

function redraw() {
  window.cancelAnimationFrame(animationFrame);
  main();
}

main();

window.addEventListener("resize", redraw);
