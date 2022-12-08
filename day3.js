const puzzle = (input, part) => {
    const lines = input.split("\n").filter(x => !!x.trim());
    const ans = part == 1 ?
        lines.map(x => x.substring(0, x.length / 2).split('')
            .filter(c => x.substring(x.length / 2).indexOf(c) >= 0)) :
        lines.reduce((r, e, i) => (i % 3 ? r[r.length - 1].push(e) : r.push([e])) && r, [])
            .map(x => x[0].split('')
                .filter(y => x[1].indexOf(y) >= 0 && x[2].indexOf(y) >= 0));

    return ans
        .map(x =>
            x.filter((v, i, s) => s.indexOf(v) == i)
                .map(x => x.toLowerCase() == x ? x.charCodeAt(0) - 96 : x.charCodeAt(0) - 38)
                .reduce((sum, x) => sum += x, 0)
        )
        .reduce((sum, x) => sum += x, 0);
};

module.exports = puzzle;
