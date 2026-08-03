// =========================
// MecanoLab - renderer.js
// Renderização do editor
// =========================

const Renderer = (() => {

    const GRID_SIZE = 50;

    function clearScreen() {
        ctx.fillStyle = "#181818";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function getCamera() {
        if (window.Camera) {
            return {
                x: Camera.x,
                y: Camera.y,
                zoom: Camera.zoom
            };
        }

        return {
            x: 0,
            y: 0,
            zoom: 1
        };
    }

    function beginCamera() {
        const cam = getCamera();

        ctx.save();

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(cam.zoom, cam.zoom);
        ctx.translate(-cam.x, -cam.y);
    }

    function endCamera() {
        ctx.restore();
    }

    function drawGrid() {

        const cam = getCamera();

        const left   = cam.x - canvas.width / (2 * cam.zoom);
        const right  = cam.x + canvas.width / (2 * cam.zoom);
        const top    = cam.y - canvas.height / (2 * cam.zoom);
        const bottom = cam.y + canvas.height / (2 * cam.zoom);

        ctx.strokeStyle = "#252525";
        ctx.lineWidth = 1 / cam.zoom;

        const startX = Math.floor(left / GRID_SIZE) * GRID_SIZE;
        const endX   = Math.ceil(right / GRID_SIZE) * GRID_SIZE;

        const startY = Math.floor(top / GRID_SIZE) * GRID_SIZE;
        const endY   = Math.ceil(bottom / GRID_SIZE) * GRID_SIZE;

        for (let x = startX; x <= endX; x += GRID_SIZE) {

            ctx.beginPath();
            ctx.moveTo(x, startY);
            ctx.lineTo(x, endY);
            ctx.stroke();

        }

        for (let y = startY; y <= endY; y += GRID_SIZE) {

            ctx.beginPath();
            ctx.moveTo(startX, y);
            ctx.lineTo(endX, y);
            ctx.stroke();

        }

        // eixo X
        ctx.strokeStyle = "#444";

        ctx.beginPath();
        ctx.moveTo(startX, 0);
        ctx.lineTo(endX, 0);
        ctx.stroke();

        // eixo Y
        ctx.beginPath();
        ctx.moveTo(0, startY);
        ctx.lineTo(0, endY);
        ctx.stroke();
    }

    function drawBodies() {

        App.parts.forEach(body => {

            ctx.save();

            ctx.translate(body.position.x, body.position.y);
            ctx.rotate(body.angle);

            if (body.circleRadius) {

                ctx.beginPath();
                ctx.arc(
                    0,
                    0,
                    body.circleRadius,
                    0,
                    Math.PI * 2
                );

            } else {

                ctx.beginPath();

                const v = body.vertices;

                ctx.moveTo(
                    v[0].x - body.position.x,
                    v[0].y - body.position.y
                );

                for (let i = 1; i < v.length; i++) {

                    ctx.lineTo(
                        v[i].x - body.position.x,
                        v[i].y - body.position.y
                    );

                }

                ctx.closePath();

            }

            ctx.fillStyle = "#4fa8ff";
            ctx.fill();

            ctx.lineWidth = 2;
            ctx.strokeStyle = "#d7ecff";
            ctx.stroke();

            ctx.restore();

        });

    }

    function drawConstraints() {

        ctx.strokeStyle = "#ffd34a";
        ctx.lineWidth = 2;

        App.joints.forEach(j => {

            if (!j.bodyA || !j.bodyB)
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

    }

    function drawHUD() {

        ctx.save();

        ctx.fillStyle = "#fff";
        ctx.font = "14px Arial";

        ctx.fillText(
            "Peças: " + App.parts.length,
            15,
            25
        );

        ctx.fillText(
            "Juntas: " + App.joints.length,
            15,
            45
        );

        ctx.fillText(
            "Ferramenta: " + App.selectedTool,
            15,
            65
        );

        ctx.restore();

    }

    function draw() {

        clearScreen();

        beginCamera();

        drawGrid();
        drawConstraints();
        drawBodies();

        endCamera();

        drawHUD();

    }

    return {
        draw
    };

})();
