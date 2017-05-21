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
    describe("Measurements", function() {
        it("Check the level's width", function() {
            expect(aLevel.width).to.equal(customLevel[0].length);
        });
        it("Check the level's height", function() {
            expect(aLevel.height).to.equal(customLevel.length);
        });
    });
    describe("Level's Content", function() {
        it("Check if the level has a player", function() {
            expect(aLevel.player).to.be.an.instanceof(Player);
        });

        it("Check if the level has at least a coin", function() {
            let coin = this.actors.filter(function(actor) {
                return actor.type == "coin";
            })[0];
            expect(coin[0]).to.be.an.instanceof(Coin);
        });
    });    
});

var Turko = new Player(new Vector(0,0));

describe("Player", function() {
    describe("Movement", function() {
        it("Check if the player can move horizontally", function() {
            expect(Turko).to.have.property("moveX");
        });

        it("Check if the player can move vertically", function() {
            expect(Turko).to.have.property("moveY");
        });
    });
});