const puzzle = (input, part) => {
    const lines = input.split("\n").filter(x => !!x.trim());
    const moves = lines.map(l => l.trim().split(' ')).map(x => [x[0], +x[1]]);

    const cycles = [20, 60, 100, 140, 180, 220];
    const crt = [...Array(6).keys()].map(_ => [...Array(40).keys()]);

    let x = 1;
    const vals = [];
    for (let i = 0; i < moves.length; ++i) {
        if (moves[i][0].startsWith('noop')) vals.push(x);
        else if (moves[i][0].startsWith('addx')) {
            vals.push(x);
            vals.push(x);
            x += moves[i][1];
        }
    }

    const part1 = cycles.map(c => c * vals[c - 1]).reduce((sum, x) => sum += x, 0);
    const part2 = crt
        .map((l, i) => l.map((_, j) => Math.abs(j - vals[i * 40 + j]) <= 1 ? '#' : ' ').join(''))
        .join("\n");

    return part == 1 ? part1 : part2;
};

module.exports = puzzle;
