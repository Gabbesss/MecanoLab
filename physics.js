// =========================
// MecanoLab - physics.js
// Sistema de física (Matter.js)
// =========================

const {
    Engine,
    World,
    Bodies,
    Body,
    Composite,
    Constraint
} = Matter;

const Physics = (() => {

    const engine = Engine.create();

    engine.gravity.x = 0;
    engine.gravity.y = 1;

    const world = engine.world;

    // Piso
    const ground = Bodies.rectangle(
        0,
        3000,
        12000,
        200,
        {
            isStatic: true,
            label: "ground"
        }
    );

    World.add(world, ground);

    function update() {
        Engine.update(engine, 1000 / 60);
    }

    function addRectangle(x, y, w, h, options = {}) {

        const body = Bodies.rectangle(
            x,
            y,
            w,
            h,
            {
                friction: 0.6,
                restitution: 0.15,
                density: 0.002,
                ...options
            }
        );

        World.add(world, body);

        App.parts.push(body);

        return body;
    }

    function addCircle(x, y, r, options = {}) {

        const body = Bodies.circle(
            x,
            y,
            r,
            {
                friction: 0.8,
                restitution: 0.2,
                density: 0.002,
                ...options
            }
        );

        World.add(world, body);

        App.parts.push(body);

        return body;
    }

    function addConstraint(bodyA, bodyB, options = {}) {

        const joint = Constraint.create({
            bodyA,
            bodyB,
            stiffness: 1,
            length: 0,
            ...options
        });

        World.add(world, joint);

        App.joints.push(joint);

        return joint;
    }

    function remove(body) {

        World.remove(world, body);

        const index = App.parts.indexOf(body);

        if (index >= 0)
            App.parts.splice(index, 1);

    }

    function clear() {

        App.parts.forEach(body => {
            World.remove(world, body);
        });

        App.joints.forEach(joint => {
            World.remove(world, joint);
        });

        App.parts.length = 0;
        App.joints.length = 0;

        // Recria o chão
        World.add(world, ground);

    }

    return {

        engine,
        world,

        update,

        addRectangle,
        addCircle,

        addConstraint,

        remove,
        clear

    };

})();
