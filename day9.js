const puzzle = (input, part) => {
    const lines = input.split("\n").filter(x => !!x.trim());
    const moves = lines.map(l => l.trim().split(' ')).map(x => [x[0], +x[1]]);

    const dir = {
        L: [-1, 0],
        R: [1, 0],
        U: [0, 1],
        D: [0, -1]
    };

    const n = part == 1 ? 2 : 10;
    const knots = [...new Array(n).keys()].map(_ => [0, 0]);

    const adjust = (H, T) => {
        const d = [T[0] - H[0], T[1] - H[1]];
        return Math.max(...d.map(x => Math.abs(x))) > 1 ?
            [H[0] + d[0] - Math.sign(d[0]), H[1] + d[1] - Math.sign(d[1])] :
            T;
    };

    const seen = new Set([knots[knots.length - 1].toString()]);
    for (let i = 0; i < moves.length; ++i) {
        const move = moves[i];
        const step = dir[move[0]];

        for (let j = 0; j < move[1]; ++j) {
            knots[0][0] += step[0];
            knots[0][1] += step[1];

            for (let k = 1; k < knots.length; ++k) {
                knots[k] = adjust(knots[k - 1], knots[k]);
            }
            seen.add(knots[knots.length - 1].toString());
        }
    }

    return seen.size;
};

module.exports = puzzle;
