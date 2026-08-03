// =========================
// input.js (novo)
// Clique para criar e arrastar
// =========================

let mouseDown = false;
let dragBody = null;

canvas.addEventListener("mousedown", function(e){

    if(e.button !== 0) return;

    mouseDown = true;

    const rect = canvas.getBoundingClientRect();

    const mouse = Camera.screenToWorld(
        e.clientX - rect.left,
        e.clientY - rect.top
    );

    const bodies = Matter.Composite.allBodies(Physics.world);

    const found = Matter.Query.point(
        bodies,
        mouse
    );

    if(found.length){

        dragBody = found[0];

        App.selectedPart = dragBody;

        Matter.Body.setStatic(
            dragBody,
            true
        );

    }else{

        switch(App.selectedTool){

            case "beam":
                dragBody = Physics.addRectangle(mouse.x,mouse.y,160,20);
            break;

            case "plate":
                dragBody = Physics.addRectangle(mouse.x,mouse.y,80,80);
            break;

            case "wheel":
                dragBody = Physics.addCircle(mouse.x,mouse.y,35);
            break;

            case "gear":
                dragBody = Physics.addCircle(mouse.x,mouse.y,40);
                dragBody.label="gear";
            break;

            case "motor":
                dragBody = Physics.addRectangle(mouse.x,mouse.y,60,60);
                dragBody.label="motor";
            break;

            case "spring":
                dragBody = Physics.addRectangle(mouse.x,mouse.y,120,18);
                dragBody.label="spring";
            break;

            case "piston":
                dragBody = Physics.addRectangle(mouse.x,mouse.y,120,25);
                dragBody.label="piston";
            break;

            case "axle":
                dragBody = Physics.addCircle(mouse.x,mouse.y,12);
                dragBody.label="axle";
            break;

        }

    }

});

canvas.addEventListener("mousemove",function(e){

    if(!mouseDown) return;
    if(!dragBody) return;

    const rect = canvas.getBoundingClientRect();

    const mouse = Camera.screenToWorld(
        e.clientX-rect.left,
        e.clientY-rect.top
    );

    Matter.Body.setPosition(
        dragBody,
        mouse
    );

});

window.addEventListener("mouseup",function(){

    mouseDown=false;

    if(dragBody){

        Matter.Body.setStatic(
            dragBody,
            false
        );

    }

    dragBody=null;

});
