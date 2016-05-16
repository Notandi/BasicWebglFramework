function handleMouseup(evt){

};
function handleMousedown(evt){

};
function handleMousewheel(evt){

};
var prevClientX;
var prevClientY;
function handleMousemove(evt){
    if (!prevClientX){
        prevClientX = evt.clientX;
    } if (!prevClientY){
        prevClientY = evt.clientY;
    } 
    var currentPosX = evt.clientX;
    var currentPosY = evt.clientY;




    spinY += (prevClientX - currentPosX)%360;
    spinX -= (prevClientY - currentPosY)%360;




    prevClientX = currentPosX;
    prevClientY = currentPosY;
};



    // Atburðaföll fyrir mús
    /*canvas.addEventListener("mousedown", function(e){
        movement = true;
        origX = e.offsetX;
        origY = e.offsetY;
        e.preventDefault();         // Disable drag and drop
    } );

    canvas.addEventListener("mouseup", function(e){
        movement = false;
    } );

    canvas.addEventListener("mousemove", function(e){
        if(movement) {
    	    spinY += (e.offsetX - origX) % 360;
            spinX += (e.offsetY - origY) % 360;
            origX = e.offsetX;
            origY = e.offsetY;
        }
    } );
    // Atburðafall fyri músarhjól
     window.addEventListener("mousewheel", function(e){
         if( e.wheelDelta > 0.0 ) {
             eye[2] += 0.2;
         } else {
             eye[2] -= 0.2;
         }
     }  ); 
    */