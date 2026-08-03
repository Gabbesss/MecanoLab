// =========================
// MecanoLab - pistons.js
// Sistema de pistões lineares
// =========================

const Pistons = (() => {

    const pistons = [];

    function create(bodyA, bodyB, options = {}) {

        const piston = {

            bodyA,
            bodyB,

            minLength: options.minLength ?? 40,
            maxLength: options.maxLength ?? 180,

            currentLength: options.length ?? 80,

            speed: options.speed ?? 1,

            direction: 1,

            enabled: true,

            constraint: Matter.Constraint.create({

                bodyA,
                bodyB,

                length: options.length ?? 80,

                stiffness: options.stiffness ?? 1,

                damping: options.damping ?? 0.05

            })

        };

        Matter.World.add(
            Physics.world,
            piston.constraint
        );

        pistons.push(piston);

        return piston;

    }

    function update() {

        for (const piston of pistons) {

            if (!piston.enabled)
                continue;

            piston.currentLength +=
                piston.speed * piston.direction;

            if (
                piston.currentLength >= piston.maxLength
            ) {

                piston.currentLength =
                    piston.maxLength;

                piston.direction = -1;

            }

            if (
                piston.currentLength <= piston.minLength
            ) {

                piston.currentLength =
                    piston.minLength;

                piston.direction = 1;

            }

            piston.constraint.length =
                piston.currentLength;

        }

    }

    function enable(piston) {

        piston.enabled = true;

    }

    function disable(piston) {

        piston.enabled = false;

    }

    function reverse(piston) {

        piston.direction *= -1;

    }

    function remove(piston) {

        Matter.World.remove(
            Physics.world,
            piston.constraint
        );

        const i = pistons.indexOf(piston);

        if (i >= 0)
            pistons.splice(i, 1);

    }

    function clear() {

        pistons.forEach(p =>
            Matter.World.remove(
                Physics.world,
                p.constraint
            )
        );

        pistons.length = 0;

    }

    // Atualização automática
    const oldPhysicsUpdate = Physics.update;

    Physics.update = function () {

        oldPhysicsUpdate();

        update();

    };

    return {

        pistons,

        create,

        update,

        enable,
        disable,
        reverse,

        remove,
        clear

    };

})();
