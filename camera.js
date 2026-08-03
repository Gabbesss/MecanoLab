// =========================
// MecanoLab - camera.js
// Sistema de câmera
// =========================

const Camera = (() => {

    let cam = {
        x: 0,
        y: 0,
        zoom: 1,

        viewportWidth: 0,
        viewportHeight: 0
    };

    let dragging = false;

    let lastMouse = {
        x: 0,
        y: 0
    };

    function updateViewport(w, h) {
        cam.viewportWidth = w;
        cam.viewportHeight = h;
    }

    function screenToWorld(sx, sy) {

        return {

            x:
                (sx - cam.viewportWidth / 2) /
                    cam.zoom +
                cam.x,

            y:
                (sy - cam.viewportHeight / 2) /
                    cam.zoom +
                cam.y

        };

    }

    function worldToScreen(wx, wy) {

        return {

            x:
                (wx - cam.x) *
                    cam.zoom +
                cam.viewportWidth / 2,

            y:
                (wy - cam.y) *
                    cam.zoom +
                cam.viewportHeight / 2

        };

    }

    canvas.addEventListener("mousedown", e => {

        // botão do meio
        if (e.button === 1) {

            dragging = true;

            lastMouse.x = e.clientX;
            lastMouse.y = e.clientY;

        }

    });

    window.addEventListener("mouseup", () => {

        dragging = false;

    });

    window.addEventListener("mousemove", e => {

        if (!dragging)
            return;

        const dx = e.clientX - lastMouse.x;
        const dy = e.clientY - lastMouse.y;

        cam.x -= dx / cam.zoom;
        cam.y -= dy / cam.zoom;

        lastMouse.x = e.clientX;
        lastMouse.y = e.clientY;

    });

    canvas.addEventListener("wheel", e => {

        e.preventDefault();

        const mouse = screenToWorld(
            e.offsetX,
            e.offsetY
        );

        const factor = e.deltaY < 0 ? 1.1 : 0.9;

        cam.zoom *= factor;

        cam.zoom = Math.max(
            0.15,
            Math.min(
                6,
                cam.zoom
            )
        );

        const mouseAfter = screenToWorld(
            e.offsetX,
            e.offsetY
        );

        cam.x += mouse.x - mouseAfter.x;
        cam.y += mouse.y - mouseAfter.y;

    }, { passive: false });

    function center(x, y) {

        cam.x = x;
        cam.y = y;

    }

    function reset() {

        cam.x = 0;
        cam.y = 0;
        cam.zoom = 1;

    }

    return {

        get x() {
            return cam.x;
        },

        get y() {
            return cam.y;
        },

        get zoom() {
            return cam.zoom;
        },

        updateViewport,
        screenToWorld,
        worldToScreen,
        center,
        reset

    };

})();
