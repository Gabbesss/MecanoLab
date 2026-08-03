// =========================
// MecanoLab - springs.js
// Sistema de molas e amortecedores
// =========================

const Springs = (() => {

    const springs = [];

    function create(bodyA, bodyB, options = {}) {

        const spring = Matter.Constraint.create({

            bodyA,
            bodyB,

            stiffness: options.stiffness ?? 0.02,
            damping: options.damping ?? 0.08,

            length: options.length ??
                Matter.Vector.magnitude({
                    x: bodyB.position.x - bodyA.position.x,
                    y: bodyB.position.y - bodyA.position.y
                })

        });

        Matter.World.add(
            Physics.world,
            spring
        );

        springs.push(spring);

        return spring;

    }

    function remove(spring){

        Matter.World.remove(
            Physics.world,
            spring
        );

        const i = springs.indexOf(spring);

        if(i >= 0)
            springs.splice(i,1);

    }

    function clear(){

        springs.forEach(s=>{

            Matter.World.remove(
                Physics.world,
                s
            );

        });

        springs.length = 0;

    }

    function update(){

        // Reservado para futuras molas inteligentes
        // (hidráulicas, pneumáticas, etc.)

    }

    function setStiffness(spring,value){

        spring.stiffness=value;

    }

    function setLength(spring,value){

        spring.length=value;

    }

    function setDamping(spring,value){

        spring.damping=value;

    }

    function compress(spring,factor){

        spring.length*=factor;

    }

    function expand(spring,factor){

        spring.length*=factor;

    }

    return{

        springs,

        create,
        remove,
        clear,

        update,

        setLength,
        setStiffness,
        setDamping,

        compress,
        expand

    };

})();
