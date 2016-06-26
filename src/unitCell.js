function UnitCell(eighth, half, sphere, colors) {
    
    this.Position : { MIN : 0, ONEB4MIN : 1, MIDDLE : 2, ONEB4MAX : 3, MAX : 4 };
    
    this.draw = function(MV, prog, pos, alpha, center, bounds, ndx) {}; // ABSTRACT
    
    this.drawEighth = function(MV, prog, rot) {};
    this.drawHalf = function(MV, prog, rot, axis) {};
    this.drawSphere = function(MV, prog) {};

    var eighth = eighth;
    var half = half;
    var sphere = sphere;
    var colors = colors;
    var scale = 1.0;
}
