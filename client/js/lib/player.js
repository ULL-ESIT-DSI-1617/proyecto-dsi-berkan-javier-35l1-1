var score = 0;

(function(exports) {
/**
* Represent the Player
* @constructor
* @param {Vector} pos - The player's pos
*/
class Player {
    constructor(pos) {
        this.pos = pos.plus(new Vector(0, -0.5));
        this.size = new Vector(0.8, 1.5);
        this.speed = new Vector(0, 0);
        this.type = "player";
    }
    /**
     * Implements the horizontal move
     * @param {Number} step - Time step in seconds
     * @param {Level} level - Level Object
     * @param {Object} keys - The keyboard's keys 
     */
    moveX(step, level, keys) {
        let playerXSpeed = 7;
        this.speed.x = 0;
        if (keys.left) 
            this.speed.x -= playerXSpeed;
        if (keys.right) 
            this.speed.x += playerXSpeed;
        var motion = new Vector(this.speed.x * step, 0);
        var newPos = this.pos.plus(motion);
        var obstacle = level.obstacleAt(newPos, this.size);
        
        if (obstacle)
            level.playerTouched(obstacle);
        else
            this.pos = newPos;
    }
    /**
     * Implements the vertical move
     * @param {Number} step - Time step in seconds
     * @param {Level} level - Level Object
     * @param {Object} keys - The keyboard's keys 
     */
    moveY(step, level, keys) {
        let gravity = 30;
        let jumpSpeed = 17;
        this.speed.y += step * gravity;
        var motion = new Vector(0, this.speed.y * step);
        var newPos = this.pos.plus(motion);
        var obstacle = level.obstacleAt(newPos, this.size);
        
        if (obstacle) {
            level.playerTouched(obstacle);
            if (keys.up && this.speed.y > 0)
                this.speed.y = -jumpSpeed;
            else
                this.speed.y = 0;
        } else {
            this.pos = newPos;
        }
    }
    /**
     * Player act method
     * @param {Number} step - Time step in seconds
     * @param {Level} level - Level Object
     * @param {Object} keys - The keyboard's keys
     */
    act(step, level, keys) {
        this.moveX(step, level, keys);
        this.moveY(step, level, keys);

        var otherActor = level.actorAt(this);
        if (otherActor)
            if(level.playerTouched(otherActor.type, otherActor)) {
                score+=50;
                submitScore(score);
                getScores();
            }
        // Losing animation
        if (level.status == "lost") {
            this.pos.y += step;
            this.size.y -= step;
        }
    }
}
exports.Player = Player;
})(self);


