// =========================
// renderer.js
// =========================

const Renderer = (() => {

    function drawBody(body){

        ctx.save();

        ctx.translate(
            body.position.x,
            body.position.y
        );

        ctx.rotate(body.angle);

        ctx.fillStyle="#4da6ff";
        ctx.strokeStyle="#ffffff";
        ctx.lineWidth=2/Camera.zoom;

        if(body.circleRadius){

            ctx.beginPath();

            ctx.arc(
                0,
                0,
                body.circleRadius,
                0,
                Math.PI*2
            );

            ctx.fill();
            ctx.stroke();

        }else{

            const w=
                body.bounds.max.x-
                body.bounds.min.x;

            const h=
                body.bounds.max.y-
                body.bounds.min.y;

            ctx.fillRect(
                -w/2,
                -h/2,
                w,
                h
            );

            ctx.strokeRect(
                -w/2,
                -h/2,
                w,
                h
            );

        }

        ctx.restore();

    }

    function draw(){

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.save();

        ctx.translate(
            canvas.width/2,
            canvas.height/2
        );

        ctx.scale(
            Camera.zoom,
            Camera.zoom
        );

        ctx.translate(
            -Camera.x,
            -Camera.y
        );

        // Grade
        ctx.strokeStyle="#303030";
        ctx.lineWidth=1/Camera.zoom;

        const size=50;

        for(let x=-5000;x<=5000;x+=size){

            ctx.beginPath();
            ctx.moveTo(x,-5000);
            ctx.lineTo(x,5000);
            ctx.stroke();

        }

        for(let y=-5000;y<=5000;y+=size){

            ctx.beginPath();
            ctx.moveTo(-5000,y);
            ctx.lineTo(5000,y);
            ctx.stroke();

        }

        // Corpos
        App.parts.forEach(drawBody);

        // Juntas
        ctx.strokeStyle="#ffd84d";

        App.joints.forEach(j=>{

            if(!j.bodyA||!j.bodyB)
                return;

            ctx.beginPath();

            ctx.moveTo(
                j.bodyA.position.x,
                j.bodyA.position.y
            );

            ctx.lineTo(
                j.bodyB.position.x,
                j.bodyB.position.y
            );

            ctx.stroke();

        });

        ctx.restore();

    }

    return{
        draw
    };

})();
