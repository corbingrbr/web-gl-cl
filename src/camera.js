// MatrixStack

function Camera() 
{
    this.State = {
        ROTATE: 0,
        TRANSLATE: 1,
        SCALE: 2
    }

    this.setAspect= function(a) { aspect = a; };
	this.setRotationFactor = function(f) { rfactor = f; };
    this.setTranslationFactor = function(float f) { tfactor = f; };
    this.setScaleFactor = function(float f) { sfactor = f; };
	
    this.mouseClicked = function(x, y, shift, ctrl, alt) {
        mousePrev = vec2(x, y);
        
        if(shift) {
		    this.state = this.State.TRANSLATE;
	    } else if(ctrl) {
		    this.state = this.State.SCALE;
	    } else {
		    this.state = this.State.ROTATE;
	    }
    };
	
    this.mouseMoved = function(x, y) {
        vec2 mouseCurr(x, y);
	    vec2 dv = mouseCurr - mousePrev;
	    
        switch(state) {
		case Camera::ROTATE:
			rotations += rfactor * dv;
			break;
		case Camera::TRANSLATE:
			translations(0) -= translations(2) * tfactor * dv(0);
			translations(1) += translations(2) * tfactor * dv(1);
			break;
		case Camera::SCALE:
			translations(2) *= (1.0f - sfactor * dv(1));
			break;
	    }
        
	    mousePrev = mouseCurr;
    };
	
    this.applyProjectionMatrix = function(P) {
    	P->perspective(fovy, aspect, znear, zfar);
    };
	
    this.applyViewMatrix = function(MV) {
        MV->translate(translations);
	    MV->rotate(rotations(1), Eigen::Vector3f(1.0f, 0.0f, 0.0f));
	    MV->rotate(rotations(0), Eigen::Vector3f(0.0f, 1.0f, 0.0f));
    };
    
    var aspect = 1.0;
    var fovy = 45.0;
    var znear = 0.1f;
    var zfar = 1000.0f;
    var rotations = vec2(0.0, 0.0);
    var translations = vec3(0.0f, 0.0f, -5.0f);
    var rfactor = 0.2;
    var tfactor = 0.001;
    var sfactor = 0.005;
    var mousePrev;
    var state;
}
