const puzzle = (input, part) => {
    const pairs = input.split("\n\n").filter(x => !!x.trim()).map(x => x.split("\n").map(y => eval(y)));

    const compare = (l, r) => {
        const tl = typeof (l);
        const tr = typeof (r);
        if (tl === 'number' && typeof (r) === 'number') return l - r;
        else if (tl === 'number' && tr === 'object') return compare([l], r);
        else if (tl === 'object' && tr === 'number') return compare(l, [r]);
        else {
            for (let i = 0; i < l.length; ++i) {
                if (r.length - 1 < i) return 1;
                else {
                    const d = compare(l[i], r[i]);
                    if (d != 0) return d;
                }
            }
            return -1;
        }
    };

    const part1 = pairs.map(p => compare(p[0], p[1])).reduce((sum, x, i) => sum += x < 0 ? i + 1 : 0, 0);

    const d = [[[2]], [[6]]];
    const part2 = pairs.flat().concat(d).sort(compare).reduce((sum, x, i) => sum *= d.some(y => JSON.stringify(x) == JSON.stringify(y)) ? i + 1 : 1, 1);

    return part == 1 ? part1 : part2;
};

module.exports = puzzle;
