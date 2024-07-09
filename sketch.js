// Define variables for dynamic canvas size
let canvasWidth, canvasHeight;

// Define variables for eye positions based on canvas dimensions
let leftEyeX, leftEyeY, rightEyeX, rightEyeY;
let leftPupilX, leftPupilY, rightPupilX, rightPupilY;
let blinking = false;
let blinkStartFrame;

// Define an array to store cloud objects
let clouds = [];

function setup() {
  canvasWidth = windowWidth; // Use full window width
  canvasHeight = windowHeight; // Use full window height
  createCanvas(canvasWidth, canvasHeight);
  frameRate(30);

  // Initialize eye positions relative to canvas size
  leftEyeX = canvasWidth * 0.425;
  rightEyeX = canvasWidth * 0.575;
  leftEyeY = canvasHeight * 0.4375;
  rightEyeY = canvasHeight * 0.4375;

  // Initialize pupil positions
  leftPupilX = leftEyeX;
  leftPupilY = leftEyeY;
  rightPupilX = rightEyeX;
  rightPupilY = rightEyeY;

  // Create initial cloud objects
  for (let i = 0; i < 5; i++) {
    let x = random(canvasWidth); // Random horizontal position
    let y = random(canvasHeight * 0.1, canvasHeight * 0.4); // Random vertical position within a range
    let w = random(50, 100); // Random cloud width
    let h = random(20, 40); // Random cloud height
    let speed = random(1, 3); // Random cloud speed
    clouds.push({ x, y, w, h, speed }); // Add cloud object to the array
  }
}

function draw() {
  background(0, 0, 250); // Set the background color

  // Move and draw each cloud
  for (let i = 0; i < clouds.length; i++) {
    let cloud = clouds[i];
    cloud.x += cloud.speed;

    // Wrap the cloud to the left when it goes off the canvas
    if (cloud.x > canvasWidth) {
      cloud.x = -cloud.w;
    }

    // Draw a sun-like shape
    fill("#ffdf22");
    noStroke();
    ellipse(canvasWidth * 0.125, canvasHeight * 0.175, canvasWidth * 0.125, canvasWidth * 0.125);

    // Draw the cloud
    fill(255);
    noStroke();
    ellipse(cloud.x, cloud.y, cloud.w, cloud.h);
  }

  // Draw the face background
  fill(87);
  noStroke();
  ellipse(canvasWidth * 0.5, canvasHeight * 1.05, canvasWidth * 0.625, canvasHeight * 0.5);
  fill(0);
  noStroke();
  ellipse(canvasWidth * 0.5, canvasHeight * 0.5, canvasWidth * 0.575, canvasHeight * 0.625);
  rect(canvasWidth * 0.5625, canvasHeight * 0.5, canvasWidth * 0.225, canvasHeight * 0.575);
  ellipse(canvasWidth * 0.5, canvasHeight * 0.825, canvasWidth * 0.225, canvasHeight * 0.125);
  fill(255, 204, 153);
  ellipse(canvasWidth * 0.5, canvasHeight * 0.5, canvasWidth * 0.425, canvasHeight * 0.5);

  fill(255, 120);
  stroke(255);
  strokeWeight(canvasWidth * 0.0125);

  // Check if it's time to blink or unblink
  if (blinking) {
    let elapsedFrames = frameCount - blinkStartFrame;
    if (elapsedFrames >= 15) { // Blink for 15 frames
      blinking = false;
      blinkStartFrame = frameCount;
    }
  } else {
    if (random(1) < 0.01) { // Randomly start blinking (adjust the probability as needed)
      blinking = true;
      blinkStartFrame = frameCount;
    }
  }

  // Draw translucent black for the sunglasses
  fill(0, 0, 0, 100); // Translucent black
  stroke(255);
  ellipse(leftEyeX, leftEyeY - (canvasHeight * 0.3125), canvasWidth * 0.125, canvasHeight * 0.1); 
  ellipse(rightEyeX, rightEyeY - (canvasHeight * 0.3125), canvasWidth * 0.125, canvasHeight * 0.1);
  
  // Ensure the line is centered and shorter
  let lineLength = canvasWidth * 0.0625;
  line(leftEyeX - (lineLength / 4), leftEyeY - (canvasHeight * 0.3125), 
       rightEyeX + (lineLength / 4), rightEyeY - (canvasHeight * 0.3125));
  
  // Adjust the eye height based on blinking state
  if (blinking) {
    fill(255);
    noStroke();
    ellipse(leftEyeX, leftEyeY, canvasWidth * 0.125, canvasHeight * 0.05); // Left eye (closed)
    ellipse(rightEyeX, rightEyeY, canvasWidth * 0.125, canvasHeight * 0.05); // Right eye (closed)
  } else {
    noStroke();
    fill(255);
    ellipse(leftEyeX, leftEyeY, canvasWidth * 0.1, canvasHeight * 0.075);
    ellipse(rightEyeX, rightEyeY, canvasWidth * 0.1, canvasHeight * 0.075);

    // Calculate the angle between the mouse and each eye
    let leftEyeAngle = atan2(mouseY - leftPupilY, mouseX - leftPupilX);
    let rightEyeAngle = atan2(mouseY - rightPupilY, mouseX - rightPupilX);

    // Calculate the new positions for the pupils based on the angle
    let pupilRadius = canvasWidth * 0.0375; // Adjust the pupil size as needed
    leftPupilX = leftEyeX + cos(leftEyeAngle) * pupilRadius;
    leftPupilY = leftEyeY + sin(leftEyeAngle) * pupilRadius;
    rightPupilX = rightEyeX + cos(rightEyeAngle) * pupilRadius;
    rightPupilY = rightEyeY + sin(rightEyeAngle) * pupilRadius;

    fill(139, 69, 19);
    ellipse(leftPupilX, leftPupilY, canvasWidth * 0.05, canvasWidth * 0.05);
    ellipse(rightPupilX, rightPupilY, canvasWidth * 0.05, canvasWidth * 0.05);
  }
  noStroke();

  fill(255, 182, 193);
  ellipse(canvasWidth * 0.36, canvasHeight * 0.6, canvasWidth * 0.1, canvasWidth * 0.1);
  ellipse(canvasWidth * 0.64, canvasHeight * 0.6, canvasWidth * 0.1, canvasWidth * 0.1);

  fill('#C4A484');
  ellipse(canvasWidth * 0.5, canvasHeight * 0.525, canvasWidth * 0.05, canvasHeight * 0.075);

  fill(0);
  noStroke();
  ellipse(leftEyeX, leftEyeY - (canvasHeight * 0.1875), canvasWidth * 0.09375, canvasHeight * 0.02);
  ellipse(rightEyeX, rightEyeY - (canvasHeight * 0.1875), canvasWidth * 0.09375, canvasHeight * 0.02);

  fill(255, 0, 0);
  arc(canvasWidth * 0.5, canvasHeight * 0.625, canvasWidth * 0.125, canvasWidth * 0.125, 0, PI);

  stroke(0);
  strokeWeight(canvasWidth * 0.005);
  noFill();
}


