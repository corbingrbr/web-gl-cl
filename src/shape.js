function Shape()
{
    // Capture OBJ info 
    this.loadMesh = function(objFileName) {
        
        OBJ.downloadMeshes({"temp" : objFileName}, this.loadMeshHelp)
    };
    
    this.loadMeshHelp = function(mesh) {  
        var obj = mesh.temp;

        eleBuf = obj.indices;
        posBuf = obj.verts;
        norBuf = obj.norms;
    };
    
    // Initialize buffers 
    this.init = function(prog) {
        
        posBufID = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, posBufID);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(posBuf), gl.STATIC_DRAW);

        norBufID = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, norBufID);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(norBuf), gl.STATIC_DRAW);

        eleBufID = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, eleBufID);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(eleBuf), gl.STATIC_DRAW);
    };
    
    // Draw shape
    this.draw = function(prog) {
        
         // Enable and bind attributes to their respective data buffers
        //gl.enableVertexAttribArray(shader.getHandle("vertPos"));
        gl.bindBuffer(gl.ARRAY_BUFFER, posBufID);
        gl.vertexAttribPointer(prog.getHandle("vertPos"), 3, gl.FLOAT, false, 0, 0);
        
        //gl.enableVertexAttribArray(shader.getHandle("vertNor"));
        gl.bindBuffer(gl.ARRAY_BUFFER, norBufID);
        gl.vertexAttribPointer(prog.getHandle("vertNor"), 3, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, eleBufID);
        
    };

    var eleBuf;
    var posBuf;
    var norBuf;
    var texBuf;
    var eleBufID;
    var posBufID;
    var norBufID;
    var texBufID;
}
