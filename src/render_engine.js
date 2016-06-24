var gl;

var RenderEngine = {
 
    initGL: function() {
        // Setup canvas and Intialize Gl
        var canvas = document.getElementById("canvas");
        try {
            // Get context and configure viewports width & height
            gl = canvas.getContext("experimental-webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
        } catch (e) {
            alert("Error with getContext");
        }
        if (!gl) {
            alert("Could not initialize WebGL");
        }

        // Enable depth testing
        gl.enable(gl.DEPTH_TEST);
    },
    
    initElements: function() {
        // Add elements to render queue
        //this.addRenderElement("regular", new regularPolygonElement("shader-vs", "shader-fs")); 
       
    },
    
    setup: function() {
        // Create context
        this.initGL();
        // Initialize shaders
        this.initElements();
    },    
    
    render: function() {
        // configure gl viewport and clean buffers
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
       
        // Iterate through elements and render all objects associated with each
        for (var element in this.renderElements) {

            // Setup rendering environment for this element
            this.renderElements[element].setupEnvironment();
            // Render the objects of this renderElement
            this.renderElements[element].renderPass();
            // Reset rendering environment
            this.renderElements[element].tearDownEnvironment();
        }
    },
    
    addRenderElement: function(name, renderElement) {

        // Sets up renderElement's shader and handles
        renderElement.setup();
        // Add element to element render queue
        this.renderElements[name] = renderElement;
    },
    
    removeRenderElement: function(name) { 
        // Clears render element from element render queue
        delete renderElements[name];
    },

    renderElements: new Object(),
};
