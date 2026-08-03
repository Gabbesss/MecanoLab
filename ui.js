// =========================
// MecanoLab - ui.js
// Interface do usuário
// =========================

const UI = (() => {

    let panel;
    let status;

    function createUI() {

        // Painel lateral de propriedades
        panel = document.createElement("div");
        panel.id = "properties-panel";

        panel.style.position = "fixed";
        panel.style.right = "10px";
        panel.style.top = "10px";
        panel.style.width = "260px";
        panel.style.background = "#2b2b2b";
        panel.style.color = "#fff";
        panel.style.padding = "12px";
        panel.style.borderRadius = "8px";
        panel.style.fontFamily = "Arial";
        panel.style.fontSize = "14px";
        panel.style.zIndex = "9999";

        panel.innerHTML = `
            <h3>Propriedades</h3>
            <div id="prop-content">
                Nenhuma peça selecionada.
            </div>

            <hr>

            <b>Atalhos</b><br>
            1-8 = Ferramentas<br>
            Q/E = Girar<br>
            Delete = Apagar<br>
            Ctrl+D = Duplicar<br>
            J = Criar junta<br>
            G = Grade ON/OFF
        `;

        document.body.appendChild(panel);

        // Barra inferior
        status = document.createElement("div");

        status.style.position = "fixed";
        status.style.left = "0";
        status.style.bottom = "0";
        status.style.width = "100%";
        status.style.background = "#181818";
        status.style.color = "#ccc";
        status.style.padding = "6px";
        status.style.fontFamily = "Arial";
        status.style.fontSize = "13px";

        document.body.appendChild(status);

    }

    function updatePanel() {

        const div =
            document.getElementById("prop-content");

        if (!div)
            return;

        const part = App.selectedPart;

        if (!part) {

            div.innerHTML =
                "Nenhuma peça selecionada.";

            return;

        }

        div.innerHTML = `
<b>Tipo:</b> ${part.label}<br>
<b>X:</b> ${part.position.x.toFixed(1)}<br>
<b>Y:</b> ${part.position.y.toFixed(1)}<br>
<b>Ângulo:</b> ${(part.angle*180/Math.PI).toFixed(1)}°<br>
<b>Massa:</b> ${part.mass.toFixed(2)}<br>
<b>Vel. Linear:</b> ${part.speed.toFixed(2)}<br>
<b>Vel. Angular:</b> ${part.angularVelocity.toFixed(2)}
`;

    }

    function updateStatus() {

        status.innerHTML =
            `Peças: ${App.parts.length}
            | Juntas: ${App.joints.length}
            | Ferramenta: ${App.selectedTool}
            | FPS: 60`;

    }

    function notify(text) {

        const n =
            document.createElement("div");

        n.innerText = text;

        n.style.position = "fixed";
        n.style.left = "50%";
        n.style.top = "30px";
        n.style.transform = "translateX(-50%)";
        n.style.background = "#008cff";
        n.style.color = "white";
        n.style.padding = "10px 20px";
        n.style.borderRadius = "6px";
        n.style.fontFamily = "Arial";
        n.style.zIndex = "10000";

        document.body.appendChild(n);

        setTimeout(() => {

            n.remove();

        }, 1800);

    }

    function update() {

        updatePanel();
        updateStatus();

    }

    createUI();

    return {

        update,
        notify

    };

})();

// Atualização contínua da interface
setInterval(() => {

    if (window.UI)
        UI.update();

}, 100);
