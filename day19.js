const { ints } = require('./common.js');
const puzzle = (input, part) => {
    const data = input.split("\n").filter(x => !!x.trim()).map(ints).map(([, ox, cx, obx, oby, gx, gy]) => [
        [ox, 0, 0, 0],
        [cx, 0, 0, 0],
        [obx, oby, 0, 0],
        [gx, 0, gy, 0]
    ]);

    const simulate = (bp, mt) => {
        const fitness = (state) => {
            const [t, res, bots] = state;
            const geodes = res[3] + (mt - t) * bots[3];
            return geodes * 10000000 + bots[2] * 10000 + bots[1] * 100 + bots[0];
        };

        let queue = [
            [0, [0, 0, 0, 0], [1, 0, 0, 0]]
        ];
        let cnt = 0;

        for (let j = 0; j < mt; ++j) {
            const nextGen = [];
            while (queue.length) {
                cnt++;
                let [t, res, bots] = queue.pop();

                let next = [t + 1, [...bots.map((b, i) => res[i] + b)], [...bots]];
                nextGen.push([...next, fitness(next)]);

                for (const [b, robot] of bp.entries()) {
                    if (!robot.every((r, i) => res[i] >= r)) continue;

                    // Can build
                    let newRes = robot.map((r, i) => res[i] - r);
                    const newBots = [...bots];
                    newBots[b]++;
                    newRes[b]--;
                    newRes = newBots.map((r, i) => newRes[i] + r);

                    next = [t + 1, [...newRes], [...newBots]];
                    nextGen.push([...next, fitness(next)]);
                }
            }

            queue = nextGen.sort(([, , , a], [, , , b]) => b - a).slice(0, 20000);
        }

        const [, [, , , maxGeode]] = queue.sort(([, [, , , a]], [, [, , , b]]) => b - a)[0];
        return maxGeode;
    }

    const part1 = (input, t) => input
        .map((bp, i) => [simulate(bp, t), i + 1])
        .map(([a, b]) => a * b)
        .reduce((sum, v) => sum + v);

    const part2 = (input, t) => input
        .slice(0, 3)
        .map(bp => simulate(bp, t))
        .reduce((p, v) => p * v);

    return part == 1 ? part1(data, 24) : part2(data, 32);
};

module.exports = puzzle;
