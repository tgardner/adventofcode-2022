const { ints } = require('./common.js');
const puzzle = (input, part) => {
    const lines = input.split("\n").filter(x => !!x.trim())
        .map(ints)
        .map(x => x.reduce((r, e, i) => (i % 2 ? r[r.length - 1].push(e) : r.push([e])) && r, []));

    let part1 = 0;
    const targetY = 2000000;
    const dist = (s, e) => s.map((x, i) => Math.abs(x - e[i])).reduce((s, x) => s += x, 0);

    const ranges = [];
    const beacons = new Set();
    for (const [s, b] of lines) {
        const d = dist(s, b);
        const a = Math.abs(s[1] - targetY);
        if (d - a >= 0) {
            ranges.push([s[0] - (d - a), s[0] + (d - a) + 1]);
        }

        if (b[1] - targetY == 0) {
            beacons.add(b[0]);
        }
    }
    ranges.sort((a, b) => a[0] - b[0]);

    let lastX = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < ranges.length; ++i) {
        if (ranges[i][0] < lastX) ranges[i][0] = lastX;
        if (ranges[i][1] <= lastX) continue;
        part1 += ranges[i][1] - ranges[i][0];
        lastX = ranges[i][1];
    }
    part1 -= beacons.size;

    let part2 = 0;
    const [min, max] = [0, 4000000];
    const freq = (x, y) => x * 4000000 + y;
    const valid = (x, y) => {
        if (x < min || y <= min || x > max || y > max) return false;
        return lines.every(l => dist(...l) < dist(l[0], [x, y]));
    }
    
    // This was my original solution, it works, but slowly ~1min
    // const diamond = (x, y, d) => {
    //     const result = [];
    //     for (let i = d; i >= 0; --i) {
    //         result.push([x + i + 1, y - Math.abs(d - i)]);
    //         result.push([x + i - 1, y + Math.abs(d - i)]);
    //     }
    //     return result;
    // };
    // outer: for (const [s, b] of lines) {
    //     const d = dist(s, b);
    //     const edges = diamond(s[0], s[1], d);
    //     for (const edge of edges) {
    //         if (valid(edge[0], edge[1])) {
    //             part2 = freq(edge[0], edge[1]);
    //             break outer;
    //         }
    //     }
    // }

    outer: for (const [s1, b1] of lines) {
        const d1 = dist(s1, b1) + 1;
        const [x1, y1] = s1;
        for (const [s2, b2] of lines) {
            const d2 = dist(s2, b2) + 1;
            const [x2, y2] = s2;

            for (const xx1 of [d1, -d1]) for (const xx2 of [d2, -d2]) for (const xx3 of [y1 - y2, y2 - y1]) {
                const xx = x1 + x2 + xx1 + xx2 + xx3;

                for (const yy1 of [d1, -d1]) for (const yy2 of [d2, -d2]) for (const yy3 of [x1 - x2, x2 - x1]) {
                    const yy = y1 + y2 + yy1 + yy2 + yy3;
                    const p = [xx / 2, yy / 2];

                    if (valid(...p)) {
                        part2 = freq(...p);
                        break outer;
                    }
                }
            }
        }
    }

    return part == 1 ? part1 : part2;
};

module.exports = puzzle;
