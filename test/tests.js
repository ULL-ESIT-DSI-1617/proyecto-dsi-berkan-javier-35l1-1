var expect = chai.expect

var vector="js/lib/vector.js";
var canvas="js/lib/canvas.js";
var conin="js/lib/coin.js";
var player="js/lib/player.js";
var lava="js/lib/lava.js";
var level="js/lib/level.js";
var game ="js/lib/game.js";
var levels="js/lib/game_levels.js";

var customLevel = ["           ",
                    "@         o",
                    "xxx       x"]

var aLevel = new Level(customLevel);
describe("Level", function() {
    describe("Width", function() {
        it("Check the level's width", function() {
            expect(aLevel.width).to.equal(customLevel[0].length);
        });
    });    
});

