// =========================
// MecanoLab - toolbox.js
// Barra de ferramentas
// =========================

const Toolbox = (() => {

    const tools = [
        "beam",
        "plate",
        "wheel",
        "gear",
        "motor",
        "spring",
        "piston",
        "axle"
    ];

    let current = "beam";

    function select(tool) {

        if (!tools.includes(tool))
            return;

        current = tool;
        App.selectedTool = tool;

        document
            .querySelectorAll("[data-part]")
            .forEach(btn => {

                btn.classList.toggle(
                    "selected",
                    btn.dataset.part === tool
                );

            });

    }

    function next() {

        let i = tools.indexOf(current);

        i = (i + 1) % tools.length;

        select(tools[i]);

    }

    function previous() {

        let i = tools.indexOf(current);

        i--;

        if (i < 0)
            i = tools.length - 1;

        select(tools[i]);

    }

    function duplicateSelected() {

        if (window.Editor)
            Editor.duplicate();

    }

    function deleteSelected() {

        if (window.Editor)
            Editor.deleteSelection();

    }

    function bindShortcuts() {

        window.addEventListener("keydown", e => {

            switch (e.key) {

                case "1":
                    select("beam");
                break;

                case "2":
                    select("plate");
                break;

                case "3":
                    select("wheel");
                break;

                case "4":
                    select("gear");
                break;

                case "5":
                    select("motor");
                break;

                case "6":
                    select("spring");
                break;

                case "7":
                    select("piston");
                break;

                case "8":
                    select("axle");
                break;

                case "[":
                    previous();
                break;

                case "]":
                    next();
                break;

                case "Delete":
                    deleteSelected();
                break;

                default:

                    if (e.ctrlKey &&
                        e.key.toLowerCase() === "d") {

                        e.preventDefault();
                        duplicateSelected();

                    }

            }

        });

    }

    bindShortcuts();

    return {

        get current() {
            return current;
        },

        select,
        next,
        previous

    };

})();
