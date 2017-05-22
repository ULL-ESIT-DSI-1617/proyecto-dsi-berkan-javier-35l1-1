(function(exports) {
/**
 * Represent Lava
 * @constructor
 * @param {Vector} pos - The pos of the Lava
 * @param {String} ch - The type of Lava
 */
class Lava {
    constructor(pos, ch) {
        this.pos = pos;
        this.size = new Vector(1, 1);
        this.type = "lava";

        if (ch == "=") {
            this.speed = new Vector(2,0);
        } else if (ch == "|") {
            this.speed = new Vector(0, 2);
        } else if (ch == "v") {
            this.speed = new Vector(0, 3);
            this.repeatPos = pos;
        }
    }
    /**
     * It computes a new position by adding the product of the time step and its current speed to  * its old position.
     * @param {Number} step - The time step in seconds
     * @param {Level} level - The level object
     */
    act(step, level) {
        var newPos = this.pos.plus(this.speed.times(step));
        if (!level.obstacleAt(newPos, this.size))
            this.pos = newPos;
        else if (this.repeatPos)
            this.pos = this.repeatPos;
        else
            this.speed = this.speed.times(-1);
    }
}

exports.Lava = Lava;

})(self);