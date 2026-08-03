// =========================
// camera.js
// =========================

const Camera = {

    x: 0,
    y: 0,
    zoom: 1,

    dragging: false,

    lastX: 0,
    lastY: 0,

    updateViewport(){},

    screenToWorld(x,y){

        return {

            x:
                (x-canvas.width/2)/this.zoom
                +this.x,

            y:
                (y-canvas.height/2)/this.zoom
                +this.y

        };

    }

};

// Arrastar câmera com botão do meio
canvas.addEventListener("mousedown",(e)=>{

    if(e.button!==1) return;

    Camera.dragging=true;

    Camera.lastX=e.clientX;
    Camera.lastY=e.clientY;

});

window.addEventListener("mouseup",()=>{

    Camera.dragging=false;

});

window.addEventListener("mousemove",(e)=>{

    if(!Camera.dragging) return;

    const dx=e.clientX-Camera.lastX;
    const dy=e.clientY-Camera.lastY;

    Camera.x-=dx/Camera.zoom;
    Camera.y-=dy/Camera.zoom;

    Camera.lastX=e.clientX;
    Camera.lastY=e.clientY;

});

// Zoom
canvas.addEventListener("wheel",(e)=>{

    e.preventDefault();

    if(e.deltaY<0)
        Camera.zoom*=1.1;
    else
        Camera.zoom*=0.9;

    Camera.zoom=Math.max(
        0.2,
        Math.min(5,Camera.zoom)
    );

},{passive:false});
