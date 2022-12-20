const { ints } = require('./common.js');
const puzzle = (input, part) => {
    input = `Blueprint 1:    Each ore robot costs 4 ore.    Each clay robot costs 2 ore.    Each obsidian robot costs 3 ore and 14 clay.    Each geode robot costs 2 ore and 7 obsidian.
  Blueprint 2:    Each ore robot costs 2 ore.    Each clay robot costs 3 ore.    Each obsidian robot costs 3 ore and 8 clay.    Each geode robot costs 3 ore and 12 obsidian.`
    const data = input.split("\n").filter(x => !!x.trim()).map(ints).map(([, ox, cx, obx, oby, gx, gy]) => [
        [ox, 0, 0, 0],
        [cx, 0, 0, 0],
        [obx, oby, 0, 0],
        [gx, 0, gy, 0]
    ]);

    const fitness = (state, mt) => {
        const [t, res, bots] = state;
        const geodes = res[3] + (mt - t) * bots[3];
        return geodes * 10000000 + bots[2] * 10000 + bots[1] * 100 + bots[0];
    }

    const simulate = (bp, mt) => {
        let queue = [
            [0, [0, 0, 0, 0], [1, 0, 0, 0]]
        ];
        let cnt = 0;

        for (let j = 0; j < mt; ++j) {
            const nextGen = [];
            while (queue.length) {
                cnt++;
                let [t, res, bots] = queue.pop();

                nextGen.push([t + 1, [...bots.map((b, i) => res[i] + b)], [...bots]]);

                for (const [b, robot] of bp.entries()) {
                    // Can build
                    if (robot.every((r, i) => res[i] >= r)) {
                        let newRes = robot.map((r, i) => res[i] - r);
                        const newBots = [...bots];
                        newBots[b]++;
                        newRes[b]--;
                        newRes = newBots.map((r, i) => newRes[i] + r);

                        nextGen.push([t + 1, [...newRes], [...newBots]]);
                    }
                }
            }

            queue = nextGen.sort((a, b) => fitness(b, mt) - fitness(a, mt))
                .slice(0, 20000);
        }

        const [, [, , , maxGeode]] = queue.sort(([, [, , , a]], [, [, , , b]]) => b - a)[0];
        return maxGeode;
    }

    const part1 = input => input
        .map((bp, i) => [simulate(bp, 24), i + 1])
        .map(([a, b]) => a * b)
        .reduce((sum, v) => sum + v);

    const part2 = input => input
        .slice(0, 3)
        .map(bp => harvest(bp, 32))
        .reduce((p, v) => p * v);

    return part == 1 ? part1(data) : part2(data);
};

module.exports = puzzle;

// ans = 988