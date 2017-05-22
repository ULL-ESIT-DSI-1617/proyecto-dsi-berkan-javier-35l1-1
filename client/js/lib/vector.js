(function(exports) {
/**
 * Represent a Vector
 * @constructor
 * @param {Number} x - Position on the x axis
 * @param {Number} y - Position on the y axis
 */
class Vector {
    constructor(x, y) {
        this.x = x; 
        this.y =y;
    }
    /**
     * 
     * @param {Vector} other - other Vector 
     */
    plus(other) {
        return new Vector(this.x + other.x, this.y + other.y);
    }
    /**
     * Scales a vector by a given amount
     * @param {Number} factor - given amount 
     */
    times(factor) {
        return new Vector(this.x * factor, this.y * factor);
    }
}
exports.Vector = Vector;
})(self);
