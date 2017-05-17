var actorChars = {
    "@": Player,
    "o": Coin,
    "=": Lava, "|": Lava, "v": Lava
};

(function(exports) {
// Level class
class Level {
    constructor(plan) {
        this.width = plan[0].length;
        this.height = plan.length;
        this.grid = [];// The grid is represented as an array of arrays.
        this.actors = []; // array for the actors(dynamic elements in the level.)
    
        for (var y = 0; y < this.height; y++) {
            var line = plan[y], gridLine = [];
            for (var x = 0; x < this.width; x++) {
                var ch = line[x], fieldType = null;
                var Actor = actorChars[ch];
                if (Actor)
                    this.actors.push(new Actor(new Vector(x, y), ch));
                else if (ch == "x")
                    fieldType = "wall";
                else if (ch == "!")
                    fieldType = "lava";
                gridLine.push(fieldType);
            }
            this.grid.push(gridLine);
        }
        this.player = this.actors.filter(function(actor) {
            return actor.type == "player";
        })[0];
        this.status = this.finishDelay = null;
    }

    isFinished() {
        return this.status != null && this.finishDelay < 0;
    }

    /* This method tells us whether a rectangle (specified by a 
    position and a size) overlaps with any nonempty space on the 
    background grid */ 
    obstacleAt(pos, size) {
        var xStart = Math.floor(pos.x);
        var xEnd = Math.ceil(pos.x + size.x);
        var yStart = Math.floor(pos.y);
        var yEnd = Math.ceil(pos.y + size.y);

        if (xStart < 0 || xEnd > this.width || yStart < 0)
            return "wall";
        if (yEnd > this.height)
            return "lava";
        for (var y = yStart; y < yEnd; y++) {
            for (var x = xStart; x < xEnd; x++) {
                var fieldType = this.grid[y][x];
                if (fieldType) 
                    return fieldType;
            }
        } 
    }
    
    /* This method scans the array of actors, looking for an actor
    that overlaps the one given as an argument */
    actorAt(actor) {
        for (var i = 0; i < this.actors.length; i++) {
            var other = this.actors[i];
            if (other != actor &&
                actor.pos.x + actor.size.x > other.pos.x &&
                actor.pos.x < other.pos.x + other.size.x &&
                actor.pos.y + actor.size.y > other.pos.y &&
                actor.pos.y < other.pos.y + other.size.y)
            return other;
        }
    }

    /* This method gives all actors in the level a chance to move.
    Its step argument is the time step in seconds. The keys object
    contains information about the arrow keys the player has pressed.*/
    animate(step, keys) {
        if (this.status != null)
            this.finishDelay -= step;
        
        let maxStep = 0.05;
        while (step > 0) {
            var thisStep = Math.min(step, maxStep);
            this.actors.forEach(function(actor) {
                actor.act(thisStep, this, keys);
            }, this);
            step -= thisStep;
        }
    }

    // This method handles collisions between the player
    // and other objects.
    playerTouched(type, actor) {
        
        if (type == "lava" && this.status == null) {
            this.status = "lost";
            this.finishDelay = 1;
        } else if (type == "coin") {
            this.actors = this.actors.filter(function(other) {
                return other != actor;
            });
            if (!this.actors.some(function(actor) {
                return actor.type == "coin";
            })) {
                this.status = "won";
                this.finishDelay = 1;
            }
            return true;
        }
    }
}
exports.Level = Level;
})(this);
