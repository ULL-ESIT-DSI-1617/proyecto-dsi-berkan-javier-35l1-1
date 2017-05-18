(function(exports) {
  var lives = 3;
  // TRACKING KEYS
  function trackKeys(codes) {
    var pressed = Object.create(null);

    function handler(event) {
      if (codes.hasOwnProperty(event.keyCode)) {
        var down = event.type == "keydown";
        pressed[codes[event.keyCode]] = down;
        event.preventDefault();
      }
    }
    addEventListener("keydown", handler);
    addEventListener("keyup", handler);
    return pressed;
  }

  function runAnimation(frameFunc) {
    var lastTime = null;

    function frame(time) {
      var stop = false;
      if (lastTime != null) {
        var timeStep = Math.min(time - lastTime, 100) / 1000;
        stop = frameFunc(timeStep) === false;
      }
      lastTime = time;
      if (!stop)
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function runLevel(level, Display, andThen) {
    var arrowCodes = {
      37: "left",
      38: "up",
      39: "right"
    };
    var arrows = trackKeys(arrowCodes);
    var display = new Display(document.body, level);
    runAnimation(function(step) {
      level.animate(step, arrows);
      display.drawFrame(step);
      display.showLiveAndScore(lives);
      if (level.isFinished()) {
        display.clear();
        if (level.status == "lost") {
          lives--;
        }
        if (andThen)
          andThen(level.status);
        return false;
      }
    });
  }

  function runGame(plans, Display) {
    function startLevel(n) {
      runLevel(new Level(plans[n]), Display, function(status) {
        if (status == "lost") {
          if (lives === 0) {
            n = 0;
            score = 0;
            lives = 3;
            var elem = document.getElementById('canvasgame');
            if (elem) elem.remove();
            var screendiv = document.getElementById('screen');
            var gameover = document.createElement("h1");
            gameover.id = 'gameover'
            var textgameover = document.createTextNode('GAME OVER');
            gameover.appendChild(textgameover);
            var insertcoin = document.createElement("h1");
            insertcoin.id = 'insertcoin'
            var textinsertcoin = document.createTextNode('Insert coin to try again');
            insertcoin.appendChild(textinsertcoin);
            screendiv.appendChild(gameover);
            gameover.appendChild(insertcoin);
            return;
          }
          startLevel(n);
        } else if (n < plans.length - 1)
          startLevel(n + 1);
        else
          var elem = document.getElementById('canvasgame');
          if (elem) elem.remove();
          var screendiv = document.getElementById('screen');
          var gameover = document.createElement("h1");
          gameover.id = 'gameover'
          var textgameover = document.createTextNode('YOU WIN, CONGRATS');
          gameover.appendChild(textgameover);
      });
    }
    startLevel(0);
  }

  exports.runGame = runGame;
})(self);