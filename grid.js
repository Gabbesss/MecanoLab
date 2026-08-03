// =========================
// MecanoLab - grid.js
// Grade infinita e snap
// =========================

const Grid = (() => {

    const GRID_SIZE = 50;
    let snapEnabled = true;
    let showGrid = true;

    function snap(value) {
        return Math.round(value / GRID_SIZE) * GRID_SIZE;
    }

    function snapPoint(x, y) {

        if (!snapEnabled)
            return { x, y };

        return {
            x: snap(x),
            y: snap(y)
        };
    }

    function draw(ctx) {

        if (!showGrid)
            return;

        const zoom = Camera.zoom;
        const camX = Camera.x;
        const camY = Camera.y;

        const left =
            camX - canvas.width / (2 * zoom);

        const right =
            camX + canvas.width / (2 * zoom);

        const top =
            camY - canvas.height / (2 * zoom);

        const bottom =
            camY + canvas.height / (2 * zoom);

        ctx.save();

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(zoom, zoom);
        ctx.translate(-camX, -camY);

        ctx.lineWidth = 1 / zoom;
        ctx.strokeStyle = "#2f2f2f";

        const startX =
            Math.floor(left / GRID_SIZE) * GRID_SIZE;

        const endX =
            Math.ceil(right / GRID_SIZE) * GRID_SIZE;

        const startY =
            Math.floor(top / GRID_SIZE) * GRID_SIZE;

        const endY =
            Math.ceil(bottom / GRID_SIZE) * GRID_SIZE;

        // Linhas verticais
        for (let x = startX; x <= endX; x += GRID_SIZE) {

            ctx.beginPath();
            ctx.moveTo(x, startY);
            ctx.lineTo(x, endY);
            ctx.stroke();

        }

        // Linhas horizontais
        for (let y = startY; y <= endY; y += GRID_SIZE) {

            ctx.beginPath();
            ctx.moveTo(startX, y);
            ctx.lineTo(endX, y);
            ctx.stroke();

        }

        // Eixos principais
        ctx.strokeStyle = "#666";

        ctx.beginPath();
        ctx.moveTo(left, 0);
        ctx.lineTo(right, 0);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, top);
        ctx.lineTo(0, bottom);
        ctx.stroke();

        ctx.restore();
    }

    function toggleGrid() {
        showGrid = !showGrid;
    }

    function toggleSnap() {
        snapEnabled = !snapEnabled;
    }

    // Atalhos
    window.addEventListener("keydown", e => {

        if (e.key.toLowerCase() === "g")
            toggleGrid();

        if (e.key.toLowerCase() === "h")
            toggleSnap();

    });

    return {

        GRID_SIZE,

        draw,
        snapPoint,

        toggleGrid,
        toggleSnap,

        get snapEnabled() {
            return snapEnabled;
        },

        get showGrid() {
            return showGrid;
        }

    };

})();
