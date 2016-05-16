function Box(){
	
};
Box.prototype = new Entity();

Box.prototype.cx = 0.0;
Box.prototype.cy = 2.0;
Box.prototype.cz = 0.0;

Box.prototype.update = function(){
};
Box.prototype.render = function(){
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