const puzzle = (input, part) => {
    const ints = (x) => x.match(/\d+/g).map(Number);
    
    const lines = input.split("\n").filter(x => !!x.trim());
    const monkeys = [];
    for (let i = 0; i < lines.length; ++i) {
        if (lines[i].startsWith("Monkey")) {
            monkeys.push({
                items: ints(lines[++i]),
                op: eval(`old => ${lines[++i].trim().replace('Operation: new = ', '')}`),
                test: ints(lines[++i])[0],
                t: ints(lines[++i])[0],
                f: ints(lines[++i])[0],
                i: 0
            })
        }
    }

    const rounds = part == 1 ? 20 : 10000;
    const lcm = monkeys.reduce((lcm, x) => lcm *= x.test, 1);
    const worry = part == 1 ? x => x / 3 : x => x % lcm;

    for (var j = 0; j < rounds; ++j) {
        for (let i = 0; i < monkeys.length; ++i) {
            let m = monkeys[i];
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
