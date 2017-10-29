var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
// Contains all circle objects.
var circleArray = [];
var textArray = [];
var phraseArray = ["You Suck!", "My Eyes!", "Really Bad!", "Not Art!", "Sad Stuff"];


window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;


  this.draw = function() {
    var color = Math.random();


    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    if (color <= .33) {
      c.strokeStyle = "rgba(0,0,255,0.5)";
      c.fillStyle = "rgba(0,0,255,0.5)";
    } else if (color <= .66) {
      c.strokeStyle = "rgba(255,0,0,0.5)";
      c.fillStyle = "rgba(255,0,0,0.5)";
    } else {
      c.strokeStyle = "rgba(0,255,0,0.5)";
      c.fillStyle = "rgba(0,255,0,0.5)";
    }

    c.fill();
    c.stroke();
  }

  this.update = function() {
    if (this.x + this.radius >= canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius >= canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

function create() {
  for (var i = 0; i < 50; i++) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var dx = (Math.random() - 0.5) * 6;
    var dy = (Math.random() - 0.5) * 6;
    var radius = 30;
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }

  for (var j = 0; j < phraseArray.length; j++) {
    var text = phraseArray[j];
    var color = 255;
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    textArray.push(new Message(text, color, x, y, 1.00, -0.05));
  }

  window.circleArray = circleArray;
  window.textArray = textArray;
  animate();

}



function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
  for (var j = 0; j < textArray.length; j++) {
    textArray[j].update();
  }
}

function Message(text, color, xPos, yPos, alpha, change) {
  this.text = text;
  this.color = color;
  this.xPos = xPos;
  this.yPos = yPos;
  this.alpha = alpha;
  this.change = change;
  var color = Math.random();
  var r = 0;
  var word1Width = c.measureText(this.text).width;
  this.draw = function() {

    if (color <= .33) {
      c.fillStyle = "rgba(" + this.color + ", 0, 0, " + this.alpha + ")";
    } else if (color <= .66) {
      c.fillStyle = "rgba(0," + this.color + "0, 0," + this.alpha + ")";
    } else {
      c.fillStyle = "rgba( 0, 0," + this.color + "," + this.alpha + ")";
    }

    r += Math.PI / 180;
    c.font = "italic 26pt Arial";
    c.save();
    c.translate(this.xPos, this.yPos);
    c.rotate(r);
    c.fillText(this.text, -word1Width/2, 4);
    c.restore();
  }

  this.update = function() {

    if (this.alpha <= 0.1) {
      this.change = 0.025;
    } else if (this.alpha >= .95) {
      this.change = -0.025;
    } else {
      this.change = this.change;
    }
    this.alpha = this.alpha + this.change;
    console.log(this.change);
    this.draw();
  }
}

resizeCanvas();
create();
