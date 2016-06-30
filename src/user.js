var User = {

   /* keys : {
        E : 
,
        C : ,
        },*/

    mouseDown : false,
    first : true,
    
    setup: function() {
        
        var canvas = document.getElementById("canvas");

        canvas.onmousedown = function(e) {
            this.mouseDown = true;
        };

        canvas.onmouseup = function(e) {
            this.mouseDown = false;
            this.first = true;
        };

        canvas.onmousemove = function(e) {
            
            if (this.mouseDown) {
                camera.mouseMoved(e.clientX, e.clientY, this.first);
                if (this.first) {
                    this.first = false; 
                }
            }         
        };
        

        // Handle user key events        
        $(document).keydown(function(e) {
	        
            switch(e.which) {
		
	        case 'E'.charCodeAt(0): // left
                Scene.expand();
		        break;
	        case 'C'.charCodeAt(0): // right
		        Scene.contract();
		        break;
	        case 'T'.charCodeAt(0): 
                Scene.toggleTranslucency();
		        break;
	        case 'N'.charCodeAt(0): 
                Scene.nextCrystal();
		        break;
            case 'L'.charCodeAt(0):
                Scene.toggleLayers();
                break;
            case 'I'.charCodeAt(0):
                Scene.toggleInspection();
                break;

	        default: return; // exit this handler for other keys
	        }
	        e.preventDefault(); // prevent the default action (scroll / move caret)
           	
        });   
    }
};
