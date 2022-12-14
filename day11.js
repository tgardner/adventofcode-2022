const { ints } = require('./common.js');
const puzzle = (input, part) => {
    const monkeys = input.split("\n\n").map(x => {
        const [_, its, op, test, t, f] = x.split("\n");
        return {
            items: ints(its),
            op: eval(`old => ${op.trim().replace('Operation: new = ', '')}`),
            test: ints(test)[0],
            t: ints(t)[0],
            f: ints(f)[0],
            i: 0
        };
    });

    const rounds = part == 1 ? 20 : 10000;
    const lcm = monkeys.reduce((lcm, x) => lcm *= x.test, 1);
    const worry = part == 1 ? x => x / 3 : x => x % lcm;

    for (var i = 0; i < rounds; ++i) {
        for(const m of monkeys) {
            for (const it of m.items) {
                const n = Math.floor(worry(m.op(it)));
                if (n % m.test == 0) {
                    monkeys[m.t].items.push(n);
                } else {
                    monkeys[m.f].items.push(n);
                }
            }
            m.i += m.items.length;
            m.items = [];
        }
    }

    const result = monkeys.sort((a, b) => b.i - a.i).filter((_, i) => i < 2);
    return result.reduce((s, x) => s *= x.i, 1);
};

module.exports = puzzle;
