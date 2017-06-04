(function(exports) {
  var lives = 3;
  var level = 0;
  // TRACKING KEYS
  /**
   * Tracks the current position of the keys
   * @param {Object} codes - Key codes 
   */
  function trackKeys(codes) {
    var pressed = Object.create(null);
    /**
     * Store the current state of the left, right, and up arrow keys
     * @param {} event 
     */
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

  // ---------------SCORE------------------------
  var submitScore = function(score) {
    $.post("http://localhost:8090/submitScore", {score:score}, function(data) {
      if(!data) {
        console.log("Server Communication Error");
        return;
      }
      if(data.error)
      {
        console.log("Server Error: " + data.error);
        return;
      }
      getScores();
    });
  };

  var getScores = function() {
    $.post("http://localhost:8090/highScores", null, function(data) {
      if (!data) {
        console.log("Server Comunication Error");
        return;
      }
      if (data.error) {
        console.log("Server Error: " + data.error);
        return;
      }
      // writting scores in the score table.
      var firstUser = document.getElementById("first-user");
      var firstScore = document.getElementById("first-score");
      var secondUser = document.getElementById("second-user");
      var secondScore = document.getElementById("second-score");
      var thirdUser = document.getElementById("third-user");
      var thirdScore = document.getElementById("third-score");
      firstUser.innerHTML = data.dbUsers[0];
      firstScore.innerHTML = data.dbScores[0];
      secondUser.innerHTML = data.dbUsers[1];
      secondScore.innerHTML = data.dbScores[1];
      thirdUser.innerHTML = data.dbUsers[2];
      thirdScore.innerHTML = data.dbScores[2];
    });
  }

  var saveGame = function(cScore, cLevel, cLives) {
    $.post("http://localhost:8090/saveGame", {score: cScore, level: cLevel, lives: cLives}, function(data) {
      if(!data) {
        console.log("Server Communication Error");
        return;
      }
      if(data.error)
      {
        console.log("Server Error: " + data.error);
        return;
      }
    });
  }

  var loadGame = function(startLevel) { 
      $.post("http://localhost:8090/loadGame", null, function(data) {
        if (!data) {
          console.log("Server Comunication Error");
          return;
        }
        if (data.error) {
          console.log("Server Error: " + data.error);
          return;
        }
        score = data.saveFile["currentScore"];
        lives = data.saveFile["lives"];
        level = data.saveFile["level"];
        startLevel(level);
      });
  }
  /**
   * Wrap requestAnimationFrame
   * @param {} frameFunc 
   */
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
  /**
   * Display the level
   * @param {Object} level - Level object 
   * @param {Class} Display - Display mode 
   * @param {Function} andThen - Given function
   */
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
  /**
   * Start building the game
   * @param {Vector} plans - Set of levels 
   * @param {Class} Display - Display mode
   */
  function runGame(plans, Display, resume) {
    getScores();
    function startLevel(n) {
      levelScore = 0;
      runLevel(new Level(plans[n]), Display, function(status) {
        if (status == "lost") {
          score -= levelScore;
          if (lives === 0) {
            n = 0;
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
            score = 0;
            return;
          }
          startLevel(n);
        } else if (n < plans.length - 1) {
          saveGame(score, n + 1, lives);
          startLevel(n + 1);
        }
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
    if(resume)
      loadGame(startLevel)
    else {
      score = 0;
      lives = 3;
      startLevel(0);
    }
  }

  exports.runGame = runGame;
  exports.submitScore = submitScore;
  exports.getScores = getScores;
  exports.loadGame = loadGame;
})(self);