var canvas;
var gl;

var playerBuffer;
var numPlayerVertices;


window.onload = function init()
{
   canvas = document.getElementById( "gl-canvas" );
   var ply = new Ply();

    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 51/256, 153/256, 255/256, 1.0 );
    // [ 0.0, 1.0, 0.0, 1.0 ],  // green
    
    gl.enable(gl.DEPTH_TEST);

    console.log("initialized");
    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    
    // VBO for the player
    var playerVertices = ply.getPlayer();
    numPlayerVertices = playerVertices.length;
    playerBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, playerBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(playerVertices), gl.STATIC_DRAW );
    

    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    colorLoc = gl.getUniformLocation( program, "vColor" );
    
    mvLoc = gl.getUniformLocation( program, "modelview" );

    // set projection
    pLoc = gl.getUniformLocation( program, "projection" );
    proj = perspective( 50.0, 1.0, 1.0, 500.0 );
    gl.uniformMatrix4fv(pLoc, false, flatten(proj));

    
    // Atburðafall fyrir lyklaborð
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);

    // Atburðafall fyrir músatburði
    window.addEventListener("mousedown",handleMousedown);
    window.addEventListener("mouseup",handleMouseup);
    window.addEventListener("mousewheel",handleMousewheel);
    window.addEventListener("mousemove",handleMousemove);
 
    entityManager.init();
    main.init();
};

// ========
// MAINLOOP
// ========
"use strict";


var main = {
    
    // "Frame Time" is a (potentially high-precision) frame-clock for animations
    _frameTime_ms : null,
    _frameTimeDelta_ms : null,

};

// Perform one iteration of the mainloop
main.iter = function (frameTime) {
    
    // Use the given frameTime to update all of our game-clocks
    this._updateClocks(frameTime);
    
    // Perform the iteration core to do all the "real" work
    this._iterCore(this._frameTimeDelta_ms);

    this._debugRender();
    
    // Request the next iteration if needed
    if (!this._isGameOver) this._requestNextIteration();
};

main._updateClocks = function (frameTime) {
    
    // First-time initialisation
    if (this._frameTime_ms === null) this._frameTime_ms = frameTime;
    
    // Track frameTime and its delta
    this._frameTimeDelta_ms = frameTime - this._frameTime_ms;
    this._frameTime_ms = frameTime;
};

main._debugRender = function () {
    document.getElementById("FT").innerHTML = "FT " + " : "+ this._frameTime_ms;
    document.getElementById("FD").innerHTML = "FD " + " : "+ this._frameTimeDelta_ms;
    document.getElementById("UU").innerHTML = "UU " + " : "+ g_prevUpdateDu;
};
main._iterCore = function (dt) {
    
    update(dt);
    render(gl);
};


// Annoying shim for Firefox and Safari
window.requestAnimationFrame = 
    window.requestAnimationFrame ||        // Chrome
    window.mozRequestAnimationFrame ||     // Firefox
    window.webkitRequestAnimationFrame;    // Safari

// This needs to be a "global" function, for the "window" APIs to callback to
function mainIterFrame(frameTime) {
    main.iter(frameTime);
}

main._requestNextIteration = function () {
    window.requestAnimationFrame(mainIterFrame);
};

main.init = function () {
  

    this._requestNextIteration();
};

function updateSimulation(du){
    entityManager.update(du);
    camera.update();
};
function renderSimulation(gl){
    entityManager.render(gl);
};
