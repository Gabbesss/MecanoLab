// =========================
// MecanoLab - parts.js
// Biblioteca de peças
// =========================

const Parts = (() => {

    function create(type, x, y) {

        switch (type) {

            case "beam":
                return beam(x, y);

            case "plate":
                return plate(x, y);

            case "wheel":
                return wheel(x, y);

            case "gear":
                return gear(x, y);

            case "motor":
                return motor(x, y);

            case "spring":
                return spring(x, y);

            case "piston":
                return piston(x, y);

            case "axle":
                return axle(x, y);

            default:
                return beam(x, y);
        }

    }

    function beam(x, y) {

        return Physics.addRectangle(
            x,
            y,
            160,
            20,
            {
                label: "beam",
                friction: 0.8
            }
        );

    }

    function plate(x, y) {

        return Physics.addRectangle(
            x,
            y,
            80,
            80,
            {
                label: "plate"
            }
        );

    }

    function wheel(x, y) {

        return Physics.addCircle(
            x,
            y,
            35,
            {
                label: "wheel",
                friction: 1.2
            }
        );

    }

    function gear(x, y) {

        const body = Physics.addCircle(
            x,
            y,
            40,
            {
                label: "gear"
            }
        );

        body.isGear = true;

        return body;

    }

    function motor(x, y) {

        const body = Physics.addRectangle(
            x,
            y,
            60,
            60,
            {
                label: "motor"
            }
        );

        body.motor = {
            enabled: true,
            speed: 0.05
        };

        return body;

    }

    function spring(x, y) {

        const body = Physics.addRectangle(
            x,
            y,
            100,
            18,
            {
                label: "spring"
            }
        );

        body.spring = {
            stiffness: 0.03,
            damping: 0.02
        };

        return body;

    }

    function piston(x, y) {

        const body = Physics.addRectangle(
            x,
            y,
            120,
            25,
            {
                label: "piston"
            }
        );

        body.piston = {

            enabled: true,

            min: 70,
            max: 160,

            speed: 1,

            direction: 1,

            value: 0

        };

        return body;

    }

    function axle(x, y) {

        return Physics.addCircle(
            x,
            y,
            12,
            {
                label: "axle",
                friction: 0.9
            }
        );

    }

    return {

        create,

        beam,
        plate,
        wheel,
        gear,
        motor,
        spring,
        piston,
        axle

    };

})();
