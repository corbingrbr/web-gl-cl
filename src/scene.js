var Scene = {

    load : function(resourceDir) {
        
        // Setup meshes
        eighth.loadMesh(resourceDir + "eighth.obj");
        eighth.init();
        
        half.loadMesh(resourceDir + "half.obj");
        half.init();
        
        sphere.loadMesh(resourceDir + "sphere.obj");
        sphere.init();

        // Setup colors
        colors["grey"] = vec3.create(0.5, 0.5, 0.5);
        colors["red"] = vec3.create(1.0, 0, 0);
        colors["green"] = vec3.create(0, 1.0, 0);
        colors["blue"] = vec3.create(0, 0.7, 1.0);
        colors["orange"] = vec3.create(1.0, 0.6, 0.2);
        colors["black"] = vec3.create(0, 0, 0);

        crystals.push(new Crystal(Crystal.Type.SIMPLE, eighth, half, sphere, colors));
        crystals.push(new Crystal(Crystal.Type.BODY, eighth, half, sphere, colors));
        crystals.push(new Crystal(Crystal.Type.FACE, eighth, half, sphere, colors));
    },

    nextCrystal : function() { 
        whichCrystal = (whichCrystal + 1) % crystals.length;
        crystals[whichCrystal].setDrawLayers();
    },

    getCrystal : function() { 
        return crystals[whichCrystal]; 
    },
    
    draw : function(MV, prog) { 
        crystals[whichCrystal].draw(MV, prog);
    },

    expand : function() {
        for (crystal in crystals) {
            crystal.expand();
        }
    },

    contract : function() {
        for (crystal in crystals) {
            crystal.contract();
        }
    },

    toggleTranslucency : function() {
        for (crystal in crystals) {
            crystal.toggleTranslucency();
        }
    },

    toggleLayers : function() {
        for (crystal in crystals) {
            crystal.toggleLayers();
        }
    },

    toggleInspection : function() {
        for (crystal in crystals) {
            crystal.toggleInspection();
        }
    },
    
    whichCrystal : 0,
    eighth = new Shape(),
    half = new Shape(),
    sphere = new Shape(),
    crystals = []
    colors = {};
};
