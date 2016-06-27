var Scene = {

    load : function(resourceDir) {
        
        // Setup meshes
        this.eighth.loadMesh(resourceDir + "eighth.obj");
        
        this.half.loadMesh(resourceDir + "half.obj");
        
        this.sphere.loadMesh(resourceDir + "sphere.obj");

        // Setup colors
        this.setupColors();

        // TODO
        //this.crystals.push(new Crystal(Crystal.Type.SIMPLE, eighth, half, sphere, colors));
        //this.crystals.push(new Crystal(Crystal.Type.BODY, eighth, half, sphere, colors));
        //this.crystals.push(new Crystal(Crystal.Type.FACE, eighth, half, sphere, colors));
    },

    setupColors : function() {
        this.colors["grey"] = vec3.fromValues(0.5, 0.5, 0.5);
        this.colors["red"] = vec3.fromValues(1.0, 0, 0);
        this.colors["green"] = vec3.fromValues(0, 1.0, 0);
        this.colors["blue"] = vec3.fromValues(0, 0.7, 1.0);
        this.colors["orange"] = vec3.fromValues(1.0, 0.6, 0.2);
        this.colors["black"] = vec3.fromValues(0, 0, 0);
    },

    nextCrystal : function() { 
        this.whichCrystal = (this.whichCrystal + 1) % this.crystals.length;
        //this.crystals[this.whichCrystal].setDrawLayers();
    },

    getCrystal : function() { 
        return this.crystals[this.whichCrystal]; 
    },
    
    draw : function(MV, prog) { 
        
        glUniformMatrix4fv(prog.getHandle("MV"), 1, GL_FALSE, MV.top());
        glUniform3fv(prog.getHandle("kdFront"), this.colors["orange"]); 
        sphere.draw(prog);
        
        //this.crystals[this.whichCrystal].draw(MV, prog);
    },

    expand : function() {
        for (crystal in this.crystals) {
            //crystal.expand();
        }
    },

    contract : function() {
        for (crystal in this.crystals) {
           //crystal.contract();
        }
    },

    toggleTranslucency : function() {
        for (crystal in this.crystals) {
            //crystal.toggleTranslucency();
        }
    },

    toggleLayers : function() {
        for (crystal in this.crystals) {
            //crystal.toggleLayers();
        }
    },

    toggleInspection : function() {
        for (crystal in this.crystals) {
            //crystal.toggleInspection();
        }
    },
    
    whichCrystal : 0,
    eighth : new Shape(),
    half : new Shape(),
    sphere : new Shape(),
    crystals : [],
    colors : {}
};
