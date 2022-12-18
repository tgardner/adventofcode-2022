const { ints } = require('./common.js');
const puzzle = (input, part) => {
    const data = input.split("\n").filter(x => !!x.trim()).map(ints);
    const seen = new Set(data.map(x => x.toString()));

    const offset = [[-1, 0, 0], [1, 0, 0], [0, -1, 0], [0, 1, 0], [0, 0, -1], [0, 0, 1]];
    const adj = (p) => offset.map(a => a.map((o, i) => o + p[i]));

    const min = [Math.min(...data.map(x => x[0])), Math.min(...data.map(x => x[1])), Math.min(...data.map(x => x[2]))];
    const max = [Math.max(...data.map(x => x[0])), Math.max(...data.map(x => x[1])), Math.max(...data.map(x => x[2]))];

    const outside = (p) => {
        if (seen.has(p)) return false;

        const visited = new Set();
        let queue = [p];
        while (queue.length) {
            const next = queue.shift();
            if (visited.has(next.toString())) continue;
            if (seen.has(next.toString())) continue;
            visited.add(next.toString())

            if (next.some((x, i) => x < min[i] || x > max[i])) return true;
            queue.push(...adj(next));
        }
        return false;
    };

    const part1 = (data) => data
        .map(x => adj(x).filter(x => !seen.has(x.toString())).length)
        .reduce((sum, x) => sum + x, 0);

    const part2 = (data) => data
        .map(x => adj(x).filter(x => outside(x)).length)
        .reduce((sum, x) => sum + x, 0);

    return part == 1 ? part1(data) : part2(data);
};

module.exports = puzzle;
