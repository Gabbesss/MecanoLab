// =========================
// MecanoLab - save.js
// Salvar e carregar projetos
// =========================

const SaveSystem = (() => {

    function serializeBody(body) {

        return {

            type: body.label || "beam",

            x: body.position.x,
            y: body.position.y,

            angle: body.angle,

            radius: body.circleRadius || null,

            width:
                body.bounds.max.x -
                body.bounds.min.x,

            height:
                body.bounds.max.y -
                body.bounds.min.y

        };

    }

    function save() {

        const data = {

            version: 1,

            parts: App.parts.map(
                serializeBody
            )

        };

        localStorage.setItem(
            "mecanolab-save",
            JSON.stringify(data)
        );

        console.log("Projeto salvo.");

    }

    function clearWorld() {

        [...App.parts].forEach(body =>
            Physics.remove(body)
        );

    }

    function load() {

        const raw = localStorage.getItem(
            "mecanolab-save"
        );

        if (!raw)
            return;

        clearWorld();

        const data = JSON.parse(raw);

        data.parts.forEach(part => {

            let body;

            switch (part.type) {

                case "wheel":
                    body = Physics.addCircle(
                        part.x,
                        part.y,
                        part.radius || 35,
                        {
                            label: "wheel"
                        }
                    );
                break;

                case "gear":
                    body = Physics.addCircle(
                        part.x,
                        part.y,
                        part.radius || 40,
                        {
                            label: "gear"
                        }
                    );
                break;

                default:

                    body = Physics.addRectangle(
                        part.x,
                        part.y,
                        part.width,
                        part.height,
                        {
                            label: part.type
                        }
                    );

            }

            Matter.Body.setAngle(
                body,
                part.angle
            );

        });

        console.log("Projeto carregado.");

    }

    function exportJSON() {

        const data = {

            version: 1,

            parts: App.parts.map(
                serializeBody
            )

        };

        const blob = new Blob(

            [
                JSON.stringify(
                    data,
                    null,
                    2
                )
            ],

            {
                type: "application/json"
            }

        );

        const url =
            URL.createObjectURL(blob);

        const a =
            document.createElement("a");

        a.href = url;
        a.download = "mecanolab.json";

        a.click();

        URL.revokeObjectURL(url);

    }

    function importJSON(file) {

        const reader =
            new FileReader();

        reader.onload = () => {

            const data =
                JSON.parse(reader.result);

            clearWorld();

            data.parts.forEach(part => {

                if (part.radius) {

                    Physics.addCircle(
                        part.x,
                        part.y,
                        part.radius,
                        {
                            label: part.type
                        }
                    );

                } else {

                    Physics.addRectangle(
                        part.x,
                        part.y,
                        part.width,
                        part.height,
                        {
                            label: part.type
                        }
                    );

                }

            });

        };

        reader.readAsText(file);

    }

    document
        .getElementById("save")
        ?.addEventListener(
            "click",
            save
        );

    document
        .getElementById("load")
        ?.addEventListener(
            "click",
            load
        );

    return {

        save,
        load,

        exportJSON,
        importJSON

    };

})();
