function Layer(rows, cols, restHeight, xexpansion, zexpansion, color, sphere) {

    this.reset = function() {
        curHeight = startHeight;
        atRest = false;
    };

    this.update = function() {
        if (curHeight - speed > restHeight) {
            curHeight -= speed;
        } else {
            curHeight = restHeight;
            atRest = true;
        }
    };

    this.draw = function(MV, prog) {
        glUniform1f(prog->getUniform("alpha"), 1.0);
        glUniform3fv(prog->getUniform("kdFront"), 1, color.data());
        
        
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                
                Vector3f pos(offset(0) + j*2*xexpansion, curHeight*xexpansion, offset(2) + i*2*zexpansion);
                
                MV->pushMatrix();
                MV->translate(pos);
                glUniformMatrix4fv(prog->getUniform("MV"), 1, GL_FALSE, MV->topMatrix().data());
                sphere->draw(prog);
                MV->popMatrix();
            }
        }
    };
    
    this.isAtRest = function() {};

    var rows = rows;
    var cols = cols;
    var startHeight = 7.0;
    var restHeight = restHeight;
    var xexpansion = xexpansion;
    var zexpansion = zexpansion;
    var curHeight 7.0;
    var speed = .05;
    var atRest = false;
    var color = color;
    var offset = vec3.create(-(cols-1)*xexpansion, restHeight,-(rows-1)*zexpansion);
    var sphere = sphere;
}
