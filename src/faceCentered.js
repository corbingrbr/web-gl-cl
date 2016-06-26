function FaceCentered(eighth, half, sphere, colors) {
    
    this.draw = function(MV, prog, pos, alpha, center, bounds, ndx) {
        
        if (center && alpha < 1.0) { 
            glUniform1f(prog->getUniform("alpha"), 1.0);
        } 

        MV->pushMatrix();
        MV->translate(pos);
        
        int x = ndx(0);
        int y = ndx(1);
        int z = ndx(2);

        glUniform3fv(prog->getUniform("kdFront"), 1, whichColor(x,y,z, 12).data());           // 12
        
        if (bounds(0) >= UnitCell::ONEB4MIN && bounds(0) <= UnitCell::MAX && // left right
            bounds(1) >= UnitCell::ONEB4MIN && bounds(1) < UnitCell::MAX && // height
            bounds(2) >= UnitCell::ONEB4MIN && bounds(2) < UnitCell::MAX) {  // depth
            drawHalf(MV, prog, 0, Vector3f(0, 1.0, 0)); 
        }

        
        glUniform3fv(prog->getUniform("kdFront"), 1, whichColor(x,y,z, 9).data());            // 9
        if (bounds(0) >= UnitCell::ONEB4MIN && bounds(0) < UnitCell::MAX && // left right
            bounds(1) >= UnitCell::ONEB4MIN && bounds(1) < UnitCell::MAX && // height
            bounds(2) >= UnitCell::MIN && bounds(2) < UnitCell::MAX) { // depth
            drawHalf(MV, prog, 90, Vector3f(0, 1.0, 0));
        }

        glUniform3fv(prog->getUniform("kdFront"), 1, whichColor(x,y,z, 14).data());           // 14
        if (bounds(0) >= UnitCell::MIN && bounds(0) < UnitCell::MAX && // left right
            bounds(1) >= UnitCell::ONEB4MIN && bounds(1) < UnitCell::MAX && // height
            bounds(2) >= UnitCell::ONEB4MIN && bounds(2) < UnitCell::MAX) { // depth
            drawHalf(MV, prog, 180, Vector3f(0, 1.0, 0));
        }

        glUniform3fv(prog->getUniform("kdFront"), 1, whichColor(x,y,z, 10).data());          // 10
        if (bounds(0) >= UnitCell::ONEB4MIN && bounds(0) < UnitCell::MAX && // left right
            bounds(1) >= UnitCell::ONEB4MIN && bounds(1) < UnitCell::MAX && // height
            bounds(2) >= UnitCell::ONEB4MIN && bounds(2) <= UnitCell::MAX) { 
            drawHalf(MV, prog, 270, Vector3f(0, 1.0, 0));
        }

        glUniform3fv(prog->getUniform("kdFront"), 1, whichColor(x,y,z, 11).data());          // 11
        if (bounds(0) >= UnitCell::ONEB4MIN && bounds(0) < UnitCell::MAX && // left right
            bounds(1) >= UnitCell::MIN && bounds(1) < UnitCell::MAX && // height
            bounds(2) >= UnitCell::ONEB4MIN && bounds(2) < UnitCell::MAX) { 
            drawHalf(MV, prog, -90, Vector3f(0, 0, 1.0));
        }

        glUniform3fv(prog->getUniform("kdFront"), 1, whichColor(x,y,z, 13).data());          // 13
        if (bounds(0) >= UnitCell::ONEB4MIN && bounds(0) < UnitCell::MAX && // left right
            bounds(1) >= UnitCell::ONEB4MIN && bounds(1) <= UnitCell::MAX && // height
            bounds(2) >= UnitCell::ONEB4MIN && bounds(2) < UnitCell::MAX) { 
            drawHalf(MV, prog, 90, Vector3f(0, 0, 1.0));
        }
        
        if (bounds(1) != UnitCell::MIN) {
            
            if (bounds(2) != UnitCell::MIN) {
                glUniform3fv(prog->getUniform("kdFront"), 1, whichColor(x,y,z, 8).data());  // 8
                if (bounds(0) != UnitCell::MAX) { drawEighth(MV, prog, 0); }
                glUniform3fv(prog->getUniform("kdFront"), 1, whichColor(x,y,z, 7).data());  // 7
                if (bounds(0) != UnitCell::MIN) { drawEighth(MV, prog, 90); }
            }
            
            if (bounds(2) != UnitCell::MAX) {
                glUniform3fv(prog->getUniform("kdFront"), 1, whichColor(x,y,z, 3).data()); // 3
                if (bounds(0) != UnitCell::MIN) { drawEighth(MV, prog, 180); }
                glUniform3fv(prog->getUniform("kdFront"), 1, whichColor(x,y,z, 4).data()); // 4
                if (bounds(0) != UnitCell::MAX) { drawEighth(MV, prog, 270); }                
            }
        }
        
        if (bounds(1) != UnitCell::MAX) {
            MV->pushMatrix();
            MV->rotate(90.0f, Vector3f(1.0, 0.0, 0.0));
            if (bounds(2) != UnitCell::MIN) {
                glUniform3fv(prog->getUniform("kdFront"), 1, whichColor(x,y,z, 5).data()); // 5
                if (bounds(0) != UnitCell::MAX) { drawEighth(MV, prog, 0); }
                glUniform3fv(prog->getUniform("kdFront"), 1, whichColor(x,y,z, 6).data()); // 6
                if (bounds(0) != UnitCell::MIN) { drawEighth(MV, prog, 90); }
            }
            
            MV->rotate(180.0f, Vector3f(1.0, 0.0, 0.0));
            if (bounds(2) != UnitCell::MAX) {
                glUniform3fv(prog->getUniform("kdFront"), 1, whichColor(x,y,z, 2).data()); // 2
                if (bounds(0) != UnitCell::MIN) { drawEighth(MV, prog, 180); } 
                glUniform3fv(prog->getUniform("kdFront"), 1, whichColor(x,y,z, 1).data()); // 1
                if (bounds(0) != UnitCell::MAX) { drawEighth(MV, prog, 270); }
            }
            MV->popMatrix();
        }

        MV->popMatrix();

        glUniform1f(prog->getUniform("alpha"), alpha); // Make sure alpha is same as it was 
    }

    this.whichColor = function(x, y, z, id) {
         
        int key = (z + y) % 3; 

        // g, gr, o: 1, 5, 12, 13
        // o, g, gr: 2, 4, 6, 8, 9, 10, 11
        // gr, o, g: 3, 7, 11, 14 

        switch (id) {
            
        case 1 : 
            switch (key) {
            case 0 : return colors["grey"];
            case 1 : return colors["green"];
            case 2 : return colors["orange"]; 
            }
        case 2 :
            switch (key) {
            case 0 : return colors["orange"];
            case 1 : return colors["grey"];
            case 2 : return colors["green"]; 
            }
        case 3 :
            switch (key) {
            case 0 : return colors["green"];
            case 1 : return colors["orange"];
            case 2 : return colors["grey"]; 
            }
        case 4 :
            switch (key) {
            case 0 : return colors["orange"];
            case 1 : return colors["grey"];
            case 2 : return colors["green"]; 
            }
        case 5 :
            switch (key) {
            case 0 : return colors["grey"];
            case 1 : return colors["green"];
            case 2 : return colors["orange"]; 
            }
        case 6 :
            switch (key) {
            case 0 : return colors["orange"];
            case 1 : return colors["grey"];
            case 2 : return colors["green"]; 
            }
        case 7 :
            switch (key) {
            case 0 : return colors["green"];
            case 1 : return colors["orange"];
            case 2 : return colors["grey"]; 
            }
        case 8 :
            switch (key) {
            case 0 : return colors["orange"];
            case 1 : return colors["grey"];
            case 2 : return colors["green"]; 
            }
        case 9 :
            switch (key) {
            case 0 : return colors["orange"];
            case 1 : return colors["grey"];
            case 2 : return colors["green"]; 
            }
        case 10 :
            switch (key) {
            case 0 : return colors["orange"];
            case 1 : return colors["grey"];
            case 2 : return colors["green"]; 
            }
        case 11 :
            switch (key) {
            case 0 : return colors["green"];
            case 1 : return colors["orange"];
            case 2 : return colors["grey"]; 
            }
        case 12 :
            switch (key) {
            case 0 : return colors["grey"];
            case 1 : return colors["green"];
            case 2 : return colors["orange"]; 
            }
        case 13 :
            switch (key) {
            case 0 : return colors["grey"];
            case 1 : return colors["green"];
            case 2 : return colors["orange"]; 
            }
        case 14 :
            switch (key) {
            case 0 : return colors["green"];
            case 1 : return colors["orange"];
            case 2 : return colors["grey"]; 
            }
        }
        

        return colors["black"];
    }
}
