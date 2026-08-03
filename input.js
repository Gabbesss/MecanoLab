// =========================
// MecanoLab - input.js
// Entrada do usuário
// =========================

(() => {

let dragging = false;
let dragBody = null;
let dragOffset = { x: 0, y: 0 };

function getMouse(e){

    const rect = canvas.getBoundingClientRect();

    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;

    const world = Camera.screenToWorld(sx, sy);

    App.mouse.x = sx;
    App.mouse.y = sy;

    App.mouse.worldX = world.x;
    App.mouse.worldY = world.y;

    return world;
}

function pickBody(x,y){

    let nearest = null;
    let nearestDist = Infinity;

    for(const body of App.parts){

        const dx = body.position.x - x;
        const dy = body.position.y - y;

        const d = Math.sqrt(dx*dx+dy*dy);

        if(d < 45 && d < nearestDist){
            nearest = body;
            nearestDist = d;
        }

    }

    return nearest;

}

canvas.addEventListener("mousedown",(e)=>{

    if(e.button!==0) return;

    const pos = getMouse(e);

    const body = pickBody(pos.x,pos.y);

    if(body){

        App.selectedPart = body;

        dragging = true;
        dragBody = body;

        dragOffset.x = body.position.x-pos.x;
        dragOffset.y = body.position.y-pos.y;

    }else{

        App.selectedPart = Parts.create(
            App.selectedTool,
            pos.x,
            pos.y
        );

    }

});

window.addEventListener("mousemove",(e)=>{

    const pos = getMouse(e);

    if(dragging && dragBody){

        Matter.Body.setPosition(
            dragBody,
            {
                x:pos.x+dragOffset.x,
                y:pos.y+dragOffset.y
            }
        );

        Matter.Body.setVelocity(
            dragBody,
            {x:0,y:0}
        );

    }

});

window.addEventListener("mouseup",()=>{

    dragging=false;
    dragBody=null;

});

window.addEventListener("keydown",(e)=>{

    if(!App.selectedPart)
        return;

    switch(e.key){

        case "Delete":

            Physics.remove(App.selectedPart);
            App.selectedPart=null;

        break;

        case "q":

        case "Q":

            Matter.Body.rotate(
                App.selectedPart,
                -Math.PI/18
            );

        break;

        case "e":

        case "E":

            Matter.Body.rotate(
                App.selectedPart,
                Math.PI/18
            );

        break;

        case "d":

        case "D":

            Matter.Body.translate(
                App.selectedPart,
                {x:10,y:0}
            );

        break;

        case "a":

        case "A":

            Matter.Body.translate(
                App.selectedPart,
                {x:-10,y:0}
            );

        break;

        case "w":

        case "W":

            Matter.Body.translate(
                App.selectedPart,
                {x:0,y:-10}
            );

        break;

        case "s":

        case "S":

            Matter.Body.translate(
                App.selectedPart,
                {x:0,y:10}
            );

        break;

    }

});

})();
