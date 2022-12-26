const puzzle = (input) => {
    const lines = input.trim().split("\n").filter(x => !!x.trim());

    const toDigs = {
        0: 0,
        1: 1,
        2: 2,
        '-': -1,
        '=': -2
    };
    const fromDigs = Object.fromEntries(Object.entries(toDigs).map(([x, y]) => [y, x]));

    const fromSnafu = s => s.split('').reduce((acc, d) => acc * 5 + toDigs[d], 0);
    const toSnafu = n => {
        if (!n) return "";
        switch (n % 5) {
            case 0: case 1: case 2: return toSnafu(Math.floor(n / 5)) + fromDigs[(n % 5).toString()];
            case 3: case 4: return toSnafu(Math.floor(n / 5 + 1)) + fromDigs[(n % 5 - 5).toString()];
        }
    };

    return toSnafu(lines.map(l => fromSnafu(l)).reduce((acc, x) => acc + x, 0));
};

module.exports = puzzle;
