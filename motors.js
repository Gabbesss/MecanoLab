// =========================
// MecanoLab - motors.js
// Sistema de motores
// =========================

const Motors = (() => {

    const motors = [];

    function create(body, options = {}) {

        const motor = {
            body,
            enabled: true,
            speed: options.speed ?? 0.08,   // rad/frame
            maxTorque: options.maxTorque ?? 0.05,
            reverse: false
        };

        motors.push(motor);
        return motor;
    }

    function remove(motor) {
        const i = motors.indexOf(motor);
        if (i >= 0)
            motors.splice(i, 1);
    }

    function clear() {
        motors.length = 0;
    }

    function update() {

        for (const motor of motors) {

            if (!motor.enabled)
                continue;

            const direction = motor.reverse ? -1 : 1;

            Matter.Body.setAngularVelocity(
                motor.body,
                motor.speed * direction
            );

        }

    }

    function enableAll(state) {
        motors.forEach(m => m.enabled = state);
    }

    function reverseAll() {
        motors.forEach(m => m.reverse = !m.reverse);
    }

    // Atualiza automaticamente após a física
    const oldUpdate = Physics.update;

    Physics.update = function () {
        oldUpdate();
        update();
    };

    return {
        motors,
        create,
        remove,
        clear,
        update,
        enableAll,
        reverseAll
    };

})();
