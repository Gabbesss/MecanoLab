// =========================
// MecanoLab - gears.js
// Sistema de engrenagens
// =========================

const Gears = (() => {

    const links = [];

    function radius(body) {
        if (body.circleRadius)
            return body.circleRadius;

        const w = body.bounds.max.x - body.bounds.min.x;
        return w / 2;
    }

    function connect(gearA, gearB, options = {}) {

        if (!gearA || !gearB)
            return null;

        const link = {

            gearA,
            gearB,

            ratio:
                options.ratio ??
                (radius(gearA) / radius(gearB)),

            reverse:
                options.reverse ?? true,

            enabled: true

        };

        links.push(link);

        return link;

    }

    function disconnect(link) {

        const i = links.indexOf(link);

        if (i >= 0)
            links.splice(i, 1);

    }

    function clear() {

        links.length = 0;

    }

    function update() {

        for (const link of links) {

            if (!link.enabled)
                continue;

            const speed =
                link.gearA.angularVelocity;

            Matter.Body.setAngularVelocity(

                link.gearB,

                speed *
                link.ratio *
                (link.reverse ? -1 : 1)

            );

        }

    }

    function autoConnect(maxDistance = 100) {

        const gears = App.parts.filter(
            p => p.label === "gear"
        );

        for (let i = 0; i < gears.length; i++) {

            for (let j = i + 1; j < gears.length; j++) {

                const a = gears[i];
                const b = gears[j];

                const dx =
                    a.position.x - b.position.x;

                const dy =
                    a.position.y - b.position.y;

                const dist = Math.sqrt(
                    dx * dx + dy * dy
                );

                if (
                    dist <=
                    radius(a) +
                    radius(b) +
                    maxDistance * 0.2
                ) {

                    const exists =
                        links.find(l =>
                            (l.gearA === a &&
                                l.gearB === b) ||
                            (l.gearA === b &&
                                l.gearB === a)
                        );

                    if (!exists)
                        connect(a, b);

                }

            }

        }

    }

    // Atualiza automaticamente
    const physicsUpdate = Physics.update;

    Physics.update = function () {

        physicsUpdate();

        autoConnect();
        update();

    };

    return {

        links,

        connect,
        disconnect,
        clear,

        autoConnect,
        update

    };

})();
