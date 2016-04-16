function Ply(){
	this.PR = PlyReader();
}
Ply.prototype.PR;

Ply.prototype.getPlayer = function(){
    var plyData = this.PR.read("cube.ply");
    return plyData.points;
};