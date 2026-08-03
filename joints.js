// =========================
// MecanoLab - joints.js
// Sistema de juntas
// =========================

const Joints = (() => {

    const joints = [];

    function createPivot(bodyA, bodyB, x, y) {

        const joint = Matter.Constraint.create({

            bodyA,
            bodyB,

            pointA: {
                x: x - bodyA.position.x,
                y: y - bodyA.position.y
            },

            pointB: {
                x: x - bodyB.position.x,
                y: y - bodyB.position.y
            },

            stiffness: 1,
            damping: 0,
            length: 0

        });

        Matter.World.add(Physics.world, joint);

        joints.push(joint);
        App.joints.push(joint);

        return joint;

    }

    function createFixed(bodyA, bodyB) {

        const joint = Matter.Constraint.create({

            bodyA,
            bodyB,

            stiffness: 1,

            length:
                Matter.Vector.magnitude({

                    x: bodyB.position.x - bodyA.position.x,
                    y: bodyB.position.y - bodyA.position.y

                })

        });

        Matter.World.add(Physics.world, joint);

        joints.push(joint);
        App.joints.push(joint);

        return joint;

    }

    function createSpring(bodyA, bodyB, stiffness = 0.03) {

        const joint = Matter.Constraint.create({

            bodyA,
            bodyB,

            stiffness,

            damping: 0.05,

            length:
                Matter.Vector.magnitude({

                    x: bodyB.position.x - bodyA.position.x,
                    y: bodyB.position.y - bodyA.position.y

                })

        });

        Matter.World.add(Physics.world, joint);

        joints.push(joint);
        App.joints.push(joint);

        return joint;

    }

    function remove(joint) {

        Matter.World.remove(
            Physics.world,
            joint
        );

        const i = joints.indexOf(joint);

        if (i >= 0)
            joints.splice(i, 1);

    }

    function clear() {

        joints.forEach(j =>
            Matter.World.remove(
                Physics.world,
                j
            )
        );

        joints.length = 0;

    }

    function update() {

        // reservado para futuras juntas motorizadas

    }

    return {

        joints,

        createPivot,
        createFixed,
        createSpring,

        remove,
        clear,
        update

    };

})();
