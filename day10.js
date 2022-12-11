const puzzle = (input, part) => {
    const lines = input.split("\n").filter(x => !!x.trim());
    const moves = lines.map(l => l.trim().split(' ')).map(x => [x[0], +x[1]]);

    const cycles = [20, 60, 100, 140, 180, 220];
    const crt = [...Array(6).keys()].map(_ => [...Array(40).keys()]);

    let t = 0;
    let x = 1;
    let part1 = 0;
    const tick = (t, x) => {
        const t1 = t - 1;
        crt[Math.floor(t1 / 40)][t1 % 40] = (Math.abs(x - (t1 % 40)) <= 1 ? '#' : ' ')
        if (cycles.indexOf(t) >= 0) {
            part1 += t * x;
        }
    };

    for (let i = 0; i < moves.length; ++i) {
        if (moves[i][0].startsWith('noop')) tick(++t, x);
        else if (moves[i][0].startsWith('addx')) {
            tick(++t, x);
            tick(++t, x);
            x += moves[i][1];
        }
    }

    let part2 = '';
    for (let i = 0; i < crt.length; ++i) {
        part2 += crt[i].join('') + "\n";
    }

    return part == 1 ? part1 : part2;
};

module.exports = puzzle;
