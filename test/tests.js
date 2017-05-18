var chai = require('chai');
var expect = chai.expect

var vector="js/lib/vector.js";
var canvas="js/lib/canvas.js";
var conin="js/lib/coin.js";
var player="js/lib/player.js";
var lava="js/lib/lava.js";
var level="js/lib/level.js";
var game ="js/lib/game.js";
var levels="js/lib/game_levels.js";

var mySuperLevel = ["           ",
                    "@         o",
                    "xxx       x"]

describe("Level", function() {
    describe("Size", function() {
        it("Check the level's length", function() {
            expect(mySuperLevel).to.have.lengthOf(3);
        });
    });    
});

