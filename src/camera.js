// MatrixStack

function Camera() 
{
    this.State = {
        ROTATE: 0,
        TRANSLATE: 1,
        SCALE: 2
    };

    this.setAspect= function(a) { aspect = a; };
	this.setRotationFactor = function(f) { rfactor = f; };
    this.setTranslationFactor = function(f) { tfactor = f; };
    this.setScaleFactor = function(f) { sfactor = f; };
	
    this.mouseClicked = function(x, y, shift, ctrl, alt) {
        mousePrev = vec2.fromValues(x, y);
        
        if(shift) {
		    state = this.State.TRANSLATE;
	    } else if(ctrl) {
		    state = this.State.SCALE;
	    } else {
		    state = this.State.ROTATE;
	    }
    };
	
    this.mouseMoved = function(x, y) {
        var mouseCurr = vec2.fromValues(x, y);
	    
        var dv;
        vec2.sub(dv, mouseCurr, mousePrev);
	    
        switch(state) {
		case this.State.ROTATE:
			rotations[0] += rfactor * dv[0];
            rotations[1] += rfactor * dv[1]
			break;
		case this.State.TRANSLATE:
			translations[0] -= translations[2] * tfactor * dv[0];
			translations[1] += translations[2] * tfactor * dv[1];
			break;
		case this.State.SCALE:
			translations[2] *= (1.0 - sfactor * dv[1]);
			break;
	    }
        
	    mousePrev = mouseCurr;
    };
	
    this.applyProjectionMatrix = function(P) {
    	P.perspective(fovy, aspect, znear, zfar);
    };
	
    this.applyViewMatrix = function(MV) {
        MV.translate(translations);
	    MV.rotate(rotations[1], vec3.fromValues(1.0, 0.0, 0.0));
	    MV.rotate(rotations[0], vec3.fromValues(0.0, 1.0, 0.0));
    };
    
    var aspect = 1.0;
    var fovy = 45.0;
    var znear = 0.1;
    var zfar = 1000.0;
    var rotations = vec2.fromValues(0.0, 0.0);
    var translations = vec3.fromValues(0.0, 0.0, -5.0);
    var rfactor = 0.2;
    var tfactor = 0.001;
    var sfactor = 0.005;
    var mousePrev;
    var state;
}
