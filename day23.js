const puzzle = (input, part) => {
    const elves = input.split("\n").filter(x => !!x.trim())
        .map((x, r) => x.split('').map((e, c) => e == '#' ? [c, r] : null).filter(e => !!e)).flat();

    const adj = ([x, y]) => [[-1, -1], [0, -1], [1, -1], [1, 0], [-1, 0], [-1, 1], [0, 1], [1, 1]]
        .map(([dx, dy]) => [x + dx, y + dy]);;

    // N, S, W, E
    const dirs = [
        [0, -1],
        [0, 1],
        [-1, 0],
        [1, 0]
    ];
    let startDir = 0;
    const seen = new Set(elves.map(e => e.toString()));

    const propose = ([x, y]) => {
        const surround = adj([x, y]);
        if (surround.every(s => !seen.has(s.toString()))) return [x, y];

        for (let i = 0; i < dirs.length; ++i) {
            const [dx, dy] = dirs[(i + startDir) % dirs.length];
            if (surround.filter(([sx, sy]) => dx != 0 && sx == x + dx || dy != 0 && sy == y + dy)
                .every(p => !seen.has(p.toString()))) {
                return [x + dx, y + dy];
            }
        }

        return [x, y];
    };

    const rounds = 10;
    let round = 0;
    while (round++ <= rounds || part == 2) {
        // Stage 1
        const proposals = elves.map(e => propose(e));
        const counts = {};
        let notMoved = true;
        for (const p of proposals) {
            counts[p.toString()] = counts[p.toString()] ? counts[p.toString()] + 1 : 1;
            notMoved &&= seen.has(p.toString());
        }

        // Stage 2
        if (part == 2 && notMoved) {
            return round;
        }

        for (let i = 0; i < elves.length; ++i) {
            const p = proposals[i];
            if (counts[p.toString()] > 1) continue;

            seen.delete(elves[i].toString());
            seen.add(p.toString());
            elves[i] = p;
        }

        startDir++;
    }

    const bounds = [
        Math.min(...elves.map(([x]) => x)),
        Math.max(...elves.map(([x]) => x)),
        Math.min(...elves.map(([, y]) => y)),
        Math.max(...elves.map(([, y]) => y)),
    ];
    const empty = (bounds[1] - bounds[0]) * (bounds[3] - bounds[2]) - elves.length;

    return empty;
};

module.exports = puzzle;
