/*

entityManager.js

A module which handles arbitrary entity-management for "Asteroids"


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops 
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


var entityManager = {

// "PRIVATE" DATA
_player : [],
_boxes : [],

// "PRIVATE" METHODS

_forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
        fn.call(aCategory[i]);
    }
},

// PUBLIC METHODS

KILL_ME_NOW : -1,
// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {
    this._categories = [this._player,this._boxes];
},

generatePlayer: function(){
    this._player.push(new Player());
},
generateBoxes: function(){
    this._boxes.push(new Box());
},
init: function() {
    this.generatePlayer();
    this.generateBoxes();

},


update: function(du) {

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];
        var i = 0;

        for (var i = 0; i < aCategory.length; ++i) {

            aCategory[i].update(du);
        }
    }
},

render: function(gl) {


    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];

        for (var i = 0; i < aCategory.length; ++i) {

            aCategory[i].render(gl);
        }
    }
}

}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();

