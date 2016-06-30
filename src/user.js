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
            //console.log(e);
            
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
		
	        case 'h': // left
                

		        break;
	        case 'e': // right
		
		        break;
	        case 38: // Up Arrow
		        break;
		
	        case 40: //Down Arrow
                console.log("down");
		        break;
		        
	        default: return; // exit this handler for other keys
	        }
	        e.preventDefault(); // prevent the default action (scroll / move caret)
           	
        });   
    }
};
