// =========================
// MecanoLab - main.js
// Inicialização do editor
// =========================

// Canvas
const canvas = document.getElementById("world");
const ctx = canvas.getContext("2d");

// Ajusta tamanho do canvas
function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    if (window.Camera && typeof Camera.updateViewport === "function") {
        Camera.updateViewport(canvas.width, canvas.height);
    }
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Estado global
window.App = {
    running: true,
    selectedTool: "beam",
    selectedPart: null,
    parts: [],
    joints: [],
    motors: [],
    springs: [],
    pistons: [],

    mouse: {
        x: 0,
        y: 0,
        worldX: 0,
        worldY: 0,
        left: false,
        right: false
    }
};

// Seleção de ferramentas
document.querySelectorAll("[data-part]").forEach(button => {
    button.addEventListener("click", () => {

        document.querySelectorAll("[data-part]")
            .forEach(b => b.classList.remove("selected"));

        button.classList.add("selected");

        App.selectedTool = button.dataset.part;
    });
});

// Ferramenta padrão
document.querySelector("[data-part='beam']").classList.add("selected");

// Botões
document.getElementById("play").onclick = () => {
    App.running = true;
};

document.getElementById("pause").onclick = () => {
    App.running = false;
};

document.getElementById("clear").onclick = () => {

    if(window.Physics){
        Physics.clear();
    }

    App.parts = [];
    App.joints = [];
};

// Loop principal
function gameLoop() {

    requestAnimationFrame(gameLoop);

    if(App.running){

        if(window.Physics){
            Physics.update();
        }

    }

    if(window.Renderer){
        Renderer.draw();
    }

}

gameLoop();
