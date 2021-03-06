/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],

// "PRIVATE" METHODS
//
// <none yet>



// PUBLIC METHODS

getNewSpatialID : function() {

    // TODO: YOUR STUFF HERE!
    // check if any of the identities are dead and if they are dead give that spatialId to a new entity
    for (var ID in this._entities) {
        var e = this._entities[ID];
        if( e.isDead) {
            e.isDead = false;
            return ID;
        }
    }
    // If no entiites were dead assign a new spatial ID
    var spatialID = this._nextSpatialID;
    this._nextSpatialID++;
    return spatialID;


},

register: function(entity) {
    var pos = entity.getPos();
    var radius = entity.getRadius();
    var spatialID = entity.getSpatialID();
    this._entities[spatialID] =
        {posX: pos.posX,
        posY: pos.posY,
        radius: radius,
        entity : entity,
        isUndefined : false,
        isDead : entity._isDeadNow
    };
    // TODO: YOUR STUFF HERE!
},

unregister: function(entity) {

    // TODO: YOUR STUFF HERE!
    var pos = entity.getPos();
    var radius = entity.getRadius();
    var spatialID = entity.getSpatialID();
    this._entities[spatialID] =
        {posX: pos.posX,
        posY: pos.posY,
        radius: radius,
        entity : entity,
        isUndefined : true,
        isDead : entity._isDeadNow
    };
    
},

findEntityInRange: function(posX, posY, radius) {

    // TODO: YOUR STUFF HERE!
    for (var ID in this._entities) {
        var e = this._entities[ID];
        if( e.isUndefined) continue;
        var distsq = util.wrappedDistSq(posX,posY,e.posX,e.posY,g_canvas.width,g_canvas.height);
        var radiussq = (radius + e.radius) * (radius + e.radius);
        if ( distsq < radiussq){
            return e.entity;
        }
    }

},

render: function(ctx) {
    var oldStyle = ctx.strokeStyle;
    var oldFill = ctx.fillStyle;
    ctx.strokeStyle = "red";
    ctx.fillStyle = "#39FF14";
    
    for (var ID in this._entities) {
        var e = this._entities[ID];
        if(e.isUndefined) continue;
        util.strokeCircle(ctx, e.posX, e.posY, e.radius);
        ctx.fillText(ID,e.posX,e.posY);    }
    ctx.strokeStyle = oldStyle;
    ctx.fillStyle = oldFill;
}

}