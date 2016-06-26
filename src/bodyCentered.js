function BodyCentered(eighth, half, sphere, colors) {

    this.draw = function(MV, prog, pos, alpha, center, bounds, ndx) {
        if (center && alpha < 1.0) { 
            glUniform1f(prog->getUniform("alpha"), 1.0);
        } 

        if (center || alpha == 1.0) {
            glUniform3fv(prog->getUniform("kdFront"), 1, colors["red"].data());
        } else {
            glUniform3fv(prog->getUniform("kdFront"), 1, colors["grey"].data());
        }
        
        MV->pushMatrix();
        MV->translate(pos);

        if (bounds(0) != UnitCell::MIN && bounds(0) != UnitCell::MAX &&
            bounds(1) != UnitCell::MIN && bounds(1) != UnitCell::MAX &&
            bounds(2) != UnitCell::MIN && bounds(2) != UnitCell::MAX) {
            // Draw center atom
            MV->pushMatrix();
            MV->scale(scale);
            glUniformMatrix4fv(prog->getUniform("MV"), 1, GL_FALSE, MV->topMatrix().data());
            sphere->draw(prog);
            MV->popMatrix();
        }
        
        glUniform3fv(prog->getUniform("kdFront"), 1, colors["grey"].data());

        if (bounds(1) != UnitCell::MIN) {
            
            if (bounds(2) != UnitCell::MIN) {
                
                if (bounds(0) != UnitCell::MAX) { drawEighth(MV, prog, 0); }
                if (bounds(0) != UnitCell::MIN) { drawEighth(MV, prog, 90); }
            }
            
            if (bounds(2) != UnitCell::MAX) {
                if (bounds(0) != UnitCell::MIN) { drawEighth(MV, prog, 180); }
                if (bounds(0) != UnitCell::MAX) { drawEighth(MV, prog, 270); }
            }
        }
        
        if (bounds(1) != UnitCell::MAX) {
            MV->pushMatrix();
            MV->rotate(90.0f, Vector3f(1.0, 0.0, 0.0));
            if (bounds(2) != UnitCell::MIN) {
                if (bounds(0) != UnitCell::MAX) { drawEighth(MV, prog, 0); }
                if (bounds(0) != UnitCell::MIN) { drawEighth(MV, prog, 90); }
            }
            
            MV->rotate(180.0f, Vector3f(1.0, 0.0, 0.0));
            if (bounds(2) != UnitCell::MAX) {
                if (bounds(0) != UnitCell::MIN) { drawEighth(MV, prog, 180); }
                if (bounds(0) != UnitCell::MAX) { drawEighth(MV, prog, 270); }
            }
            
            MV->popMatrix();
        }
        
        MV->popMatrix();

        glUniform1f(prog->getUniform("alpha"), alpha); // Make sure alpha is same as it was 
    };

}
