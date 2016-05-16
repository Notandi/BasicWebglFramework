function Player(){
	
};
Player.prototype = new Entity();

Player.prototype.Key_Forward = 'W'.charCodeAt(0);
Player.prototype.Key_Backward = 'S'.charCodeAt(0);
Player.prototype.Key_Left = 'A'.charCodeAt(0);
Player.prototype.Key_Right = 'D'.charCodeAt(0);
Player.prototype.cx = 0.0;
Player.prototype.cy = 1.0;
Player.prototype.cz = 0.0;

Player.prototype.update = function(){
    this.input();
    at = vec3(this.cx,this.cy,this.cz);
};
Player.prototype.input = function(){
    if(keys[this.Key_Forward]){
    };
    if(keys[this.Key_Backward]){
    };
    if(keys[this.Key_Left]){
        this.cx--;
    };
    if(keys[this.Key_Right]){
        this.cx++;
    };
};
Player.prototype.render = function(){
    
	gl.bindBuffer( gl.ARRAY_BUFFER, playerBuffer );
	var mv = lookAt( eye, at, vec3(0.0, 1.0, 0.0) );

    // færa hlut
    var mv1 = mv;
    mv1 = mult(mv1, translate(this.cx,this.cy,this.cz));
    
    gl.uniform4fv( colorLoc, vec4(0.0, 1.0, 0.0, 1.0 ) );
    
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv1));
    gl.drawArrays( gl.TRIANGLES, 0, numPlayerVertices );
};