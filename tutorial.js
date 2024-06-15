function run(){


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

document.getElementById("canvas").style.display = "unset";

bullets = [];
var k = 0;
var l =1;
var i = 3;
var r = 1;
var q = 1;
var f =-1;
var w = 0;
var finalspeed = 0;
var speed2 = 3;
var score = 0;
var audio = document.getElementById("audio");
var audio2 = document.getElementById("audio2");
var coinaudio = document.getElementById("coinaudio");
var coinaudio2 = document.getElementById("coinaudio2");

class bullet {
  constructor(x, y, countable) {
    this.x = x;
    this.y = y;
    this.countable = countable;
  }
}

var circle = {
  x: 400,
  y: 400,
  size: 30,
  sx: 5,
  sy: 4
};

var shooter = {
  y: 0,
  x: 30
};


var frameCount = 0;
var $results = $("#results");
var fps, fpsInterval, startTime, now, then, elapsed;

startAnimating(144);

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    update();
}






function update(){


  // request another frame

  requestAnimationFrame(update);

  // calc elapsed time since last loop

  now = Date.now();
  elapsed = now - then;

  // if enough time has elapsed, draw the next frame

  if (elapsed > fpsInterval) {

      // Get ready for next frame by setting then=now, but...
      // Also, adjust for fpsInterval not being multiple of 16.67
      then = now - (elapsed % fpsInterval);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillRect(shooter.x, shooter.y, 70, 40);
      shooter.y += l*finalspeed*0.3;


      finalspeed = speed2 + (0.001*w);

      if (shooter.y > (canvas.height - 50)) {
        l = -1;
      }
      else if (shooter.y < 0) {
        l = 1;
      }


      k = 0;
      ctx.fillRect(1500, 0, 100, 400);
      ctx.fillRect(1500, 700, 100, 300);

      bullets.forEach(move);
      ctx.font = "30px Arial";
      var speed = Math.round((finalspeed / speed2)*10) / 10;

      ctx.fillText("Speed: "+ speed, (canvas.width - 250), 50);
      ctx.fillText("Score: "+ score, (canvas.width - 250), 150);


      // TESTING...Report #seconds since start and achieved fps.
      var sinceStart = now - startTime;
      var currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100;
      $results.text("Elapsed time= " + Math.round(sinceStart / 1000 * 100) / 100 + " secs @ " + currentFps + " fps.");


      speed2 = (1/currentFps)*1000;
      w+= speed2;

  }

}

function move(){
  ctx.beginPath();
  ctx.arc(bullets[k].x, bullets[k].y, circle.size, 0, Math.PI * 2);
  ctx.fillStyle = "black";
  ctx.fill();
  bullets[k].x += 1*speed2;
  if (bullets[k].x > 1500 && bullets[k].y > 700) {
    alert("you lost, your score is: " + score);
    finalspeed = 0;
    w = 0;
    score = 0;
    bullets = [];
  }
  else if (bullets[k].x > 1500 && bullets[k].y < 400) {
    alert("you lost, your score is: " + score);
    finalspeed = 0;
    w = 0;
    score = 0;
    bullets = [];
  }
  if (bullets[k].x > 1500 && bullets[k].countable == "True") {
    score += 1;
    bullets[k].countable = "False";
    if (r == 1) {
      coinaudio.play();
      r += 1;
    }
    else if (r == 2) {
      coinaudio2.play();
      r -= 1;
    }
  }
  k +=1;
}


update();


function printMousePos(event) {
    f+=1;

    if (f > 1) {


    bullets.push(new bullet((shooter.x + 100), shooter.y, "True"));

    if (q == 1) {
      audio.play();
      q += 1;
    }
    else if (q == 2) {
      audio2.play();
      q -= 1;
    }
}
}
document.addEventListener("click", printMousePos);

}
