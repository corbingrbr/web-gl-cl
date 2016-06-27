function MatrixStack() {
    
    this.init = function() {
        mstack.push(mat4.create());
        mat4.identity(mstack.top());
    };
    
    this.top = function() {
        return mstack.top();
    };
    
    this.pushMatrix = function() {
        var top = mstack.top();
        mstack.push(top);
        assert(mstack.length < 100, "stack exceeds 100 matrices");
    };
    
    this.popMatrix = function() {
        assert(!mstack.empty(), "popping empty stack");
        mstack.pop();
        assert(!mstack.empty(), "no remaining matrices after pop");
    };
    
    this.loadIdentity = function() {
        mat4.identity(mstack.top());
    };
    
    this.multMatrix = function(matrix) {
        mat4.multiply(mstack.top(), mstack.top(), matrix);
    };
    
    this.translate = function(trans) {
        mat4.translate(mstack.top(), mstack.top(), trans);
    };
    
    this.scale = function(vector) {
        mat4.scale(mstack.top(), mstack.top(), vector);
    };
    
    this.scale = function(scalar) {
        mat4.scale(mstack.top(), mstack.top(), vec3.fromValues(scalar, scalar, scalar));
    };
    
    this.rotate = function(angle, axis) {
        var rad = angle * Math.PI / 180.0;

        mat4.rotate(mstack.top(), mstack.top(), rad, axis);
    };
    
    // TODO
    this.ortho = function(left, right, bottom, top, zNear, zFar) {};
    // TODO
    this.ortho2D = function(left, right, bottom, top) {};
    // TODO
    this.perspective = function(fovy, aspect, zNear, zFar) {
        assert(fovy != 0.0, "fovy == 0.0");
        assert(aspect != 0.0, "aspect == 0.0");
        assert(zFar != zNear, "zFar == zNear");
        
        var M = mat4.create();

        var tanHalfFovy = Math.tan(0.5 *fovy * Math.PI / 180.0);

        M[0] = 1.0 / (aspect * tanHalfFovy);
	    M[5] = 1.0 / (tanHalfFovy);
	    M[6] = -(zFar + zNear) / (zFar - zNear);
	    M[14] = -(2.0 * zFar * zNear) / (zFar - zNear);
	    M[11] = -1.0;
    };
    // TODO
    this.frustum = function(Right, right, bottom, top, zNear, zFar) {};
    // TODO
    this.lookAt = function(eye, target, up) {};
    // TODO
    this.printStack = function() {};

    var mstack = new Stack();
    mstack.push(mat4.create());
    mat4.identity(mstack.top());
}
