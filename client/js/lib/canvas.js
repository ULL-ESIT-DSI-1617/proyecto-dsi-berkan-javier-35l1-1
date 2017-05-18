class CanvasDisplay {
    
    constructor(parent, level) {
        this.scale = 20;
        let elem = document.getElementById("canvasgame");
        let gameovertext = document.getElementById('gameover');
        let insertcointext = document.getElementById('insertcoin');
        if (elem) elem.remove();
        if (gameovertext) gameovertext.remove();
        if (insertcointext) insertcointext.remove();
        let node = document.getElementById('screen');
        this.canvas = document.createElement("canvas");
        this.canvas.id = "canvasgame";
        this.canvas.width = Math.min(590, level.width * this.scale);
        this.canvas.height = Math.min(392, level.height * this.scale);
        node.appendChild(this.canvas);
        this.cx = this.canvas.getContext("2d");

        this.level = level;
        this.animationTime = 0;
        this.flipPlayer = false;

        this.viewport = {
            left: 0,
            top: 0,
            width: this.canvas.width / this.scale,
            height: this.canvas.height / this.scale
        };

        this.drawFrame(0);
    }

    clear() {
        this.canvas.parentNode.removeChild(this.canvas);
    }

    drawFrame(step) {
        this.animationTime += step;
        this.updateViewport();
        this.clearDisplay();
        this.drawBackground();
        this.drawActors();
    }

    updateViewport() {
        var view = this.viewport, margin = view.width / 3;
        var player = this.level.player;
        var center = player.pos.plus(player.size.times(0.5));

        if (center.x < view.left + margin)
            view.left = Math.max(center.x - margin, 0);
        else if (center.x > view.left + view.width - margin)
            view.left = Math.min(center.x + margin - view.width,
            this.level.width - view.width);
        if (center.y < view.top + margin)
            view.top = Math.max(center.y - margin, 0);
        else if (center.y > view.top + view.height - margin)
            view.top = Math.min(center.y + margin - view.height,
            this.level.height - view.height);
    }

    clearDisplay() {
        if (this.level.status == "won")
            this.cx.fillStyle = "rgb(68, 191, 255)";
        else if (this.level.status == "lost")
            this.cx.fillStyle = "rgb(44, 136, 214)";
        else
            this.cx.fillStyle = "rgb(52, 166, 251)";
            this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    drawBackground() {
        var playerSprites = document.createElement("img");
        playerSprites.src = "js/sprites/sprites.png";
        var otherSprites = document.createElement("img");
        otherSprites.src = "js/sprites/sprites.png";
        
        var view = this.viewport;
        var xStart = Math.floor(view.left);
        var xEnd = Math.ceil(view.left + view.width);
        var yStart = Math.floor(view.top);
        var yEnd = Math.ceil(view.top + view.height);

        for (var y = yStart; y < yEnd; y++) {
            for (var x = xStart; x < xEnd; x++) {
            var tile = this.level.grid[y][x];
            if (tile == null) continue;
            var screenX = (x - view.left) * this.scale;
            var screenY = (y - view.top) * this.scale;
            var tileX = tile == "lava" ? this.scale : 0;
            this.cx.drawImage(otherSprites,
                                tileX,         0, this.scale, this.scale,
                                screenX, screenY, this.scale, this.scale);
            }
        }
    }

    flipHorizontally(context, around) {
        context.translate(around, 0);
        context.scale(-1, 1);
        context.translate(-around, 0);
    }

    drawPlayer(x, y, width, height) {
        var playerSprites = document.createElement("img");
        playerSprites.src = "js/sprites/player.png";
        var playerXOverlap = 4;
        
        var sprite = 8, player = this.level.player;
        width += playerXOverlap * 2;
        x -= playerXOverlap;
        if (player.speed.x != 0)
            this.flipPlayer = player.speed.x < 0;

        if (player.speed.y != 0)
            sprite = 9;
        else if (player.speed.x != 0)
            sprite = Math.floor(this.animationTime * 12) % 8;

        this.cx.save();
        if (this.flipPlayer)
            this.flipHorizontally(this.cx, x + width / 2);

        this.cx.drawImage(playerSprites,
                            sprite * width, 0, width, height,
                            x,              y, width, height);

        this.cx.restore();        
    }

    drawActors() {
        var otherSprites = document.createElement("img");
        otherSprites.src = "js/sprites/sprites.png";
        this.level.actors.forEach(function(actor) {
            var width = actor.size.x * this.scale;
            var height = actor.size.y * this.scale;
            var x = (actor.pos.x - this.viewport.left) * this.scale;
            var y = (actor.pos.y - this.viewport.top) * this.scale;
            if (actor.type == "player") {
                this.drawPlayer(x, y, width, height);
            } else {
                var tileX = (actor.type == "coin" ? 2 : 1) * this.scale;
                this.cx.drawImage(otherSprites,
                        tileX, 0, width, height,
                        x,     y, width, height);
            }
        }, this);
    }

    showLiveAndScore(lives) {
        this.cx.fillStyle="rgb(59,59,59)";
        this.cx.font="bold 20px Arial";
        this.cx.fillText("Lives: " + lives, this.canvas.width - 120, 20);
        this.cx.fillText("Score: " + score, this.canvas.width - 120, 40);
    }
}
