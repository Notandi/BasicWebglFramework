var eye = vec3(0.0,2.0,-4.0);
var at = vec3(0.0,0.0,0.0);
var spinX = 0;
var spinY = 0;
var camera = {
update: function() {
	eye[0] = at[0] + Math.sin(spinY/180*Math.PI) * 9.0;
    eye[2] = at[2] + Math.cos(spinY/180*Math.PI) * 9.0;
}
};