// =========================
// MecanoLab - editor.js
// Ferramentas de edição
// =========================

const Editor = (() => {

    let selection = [];
    let snapToGrid = true;
    const GRID_SIZE = 50;

    function snap(value) {
        if (!snapToGrid) return value;
        return Math.round(value / GRID_SIZE) * GRID_SIZE;
    }

    function select(body, add = false) {

        if (!body) {
            if (!add) selection = [];
            App.selectedPart = null;
            return;
        }

        if (!add)
            selection = [];

        if (!selection.includes(body))
            selection.push(body);

        App.selectedPart = body;
    }

    function getSelection() {
        return selection;
    }

    function duplicate() {

        const created = [];

        selection.forEach(body => {

            let clone;

            if (body.circleRadius) {

                clone = Physics.addCircle(
                    body.position.x + 80,
                    body.position.y + 80,
                    body.circleRadius,
                    {
                        label: body.label
                    }
                );

            } else {

                const w = body.bounds.max.x - body.bounds.min.x;
                const h = body.bounds.max.y - body.bounds.min.y;

                clone = Physics.addRectangle(
                    body.position.x + 80,
                    body.position.y + 80,
                    w,
                    h,
                    {
                        label: body.label
                    }
                );

            }

            Matter.Body.setAngle(clone, body.angle);

            created.push(clone);

        });

        selection = created;

    }

    function deleteSelection() {

        selection.forEach(body => {
            Physics.remove(body);
        });

        selection = [];
        App.selectedPart = null;

    }

    function connectSelected() {

        if (selection.length !== 2)
            return;

        Physics.addConstraint(
            selection[0],
            selection[1],
            {
                stiffness: 0.95,
                length: 0
            }
        );

    }

    function moveSelection(dx, dy) {

        selection.forEach(body => {

            Matter.Body.translate(body, {
                x: dx,
                y: dy
            });

        });

    }

    function snapSelection() {

        if (!snapToGrid)
            return;

        selection.forEach(body => {

            Matter.Body.setPosition(body, {
                x: snap(body.position.x),
                y: snap(body.position.y)
            });

        });

    }

    function toggleGrid() {
        snapToGrid = !snapToGrid;
    }

    window.addEventListener("keydown", e => {

        if (e.ctrlKey && e.key.toLowerCase() === "d") {
            e.preventDefault();
            duplicate();
        }

        if (e.key === "Delete") {
            deleteSelection();
        }

        if (e.key.toLowerCase() === "g") {
            toggleGrid();
        }

        if (e.key.toLowerCase() === "j") {
            connectSelected();
        }

        if (e.key === "ArrowLeft")
            moveSelection(-10, 0);

        if (e.key === "ArrowRight")
            moveSelection(10, 0);

        if (e.key === "ArrowUp")
            moveSelection(0, -10);

        if (e.key === "ArrowDown")
            moveSelection(0, 10);

    });

    return {

        select,
        getSelection,
        duplicate,
        deleteSelection,
        connectSelected,
        snapSelection,
        toggleGrid

    };

})();
