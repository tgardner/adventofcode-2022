const { ints } = require('./common.js');
const puzzle = (input, part) => {
    const dist = ([ax, ay], [bx, by]) => Math.abs(ax - bx) + Math.abs(ay - by);

    const data = input.split("\n").filter(x => !!x.trim())
        .map(ints)
        .map(([sx, sy, bx, by]) => [[sx, sy], [bx, by]])
        .map(([s, x], i) => [s, x, dist(s, x), i]);

    const part1 = (data, row = 2000000) => {
        const ranges = [];
        const beacons = new Set();
        for (const [s, b, d] of data) {
            const a = Math.abs(s[1] - row);
            if (d - a >= 0) {
                ranges.push([s[0] - (d - a), s[0] + (d - a) + 1]);
            }

            if (b[1] - row == 0) {
                beacons.add(b[0]);
            }
        }
        ranges.sort((a, b) => a[0] - b[0]);

        let result = 0;
        let lastX = Number.NEGATIVE_INFINITY;
        for (const range of ranges) {
            if (range[0] < lastX) range[0] = lastX;
            if (range[1] <= lastX) continue;
            result += range[1] - range[0];
            lastX = range[1];
        }
        result -= beacons.size;
        return result;
    };

    const part2 = (data, min = 0, max = 4000000) => {
        const freq = (x, y) => x * 4000000 + y;
        const valid = (x, y) => {
            if (x < min || y <= min || x > max || y > max) return false;
            return data.every(([s, , d]) => d < dist(s, [x, y]));
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
        // outer: for (const [s, b] of data) {
        //     const d = dist(s, b);
        //     const edges = diamond(s[0], s[1], d);
        //     for (const p of edges) {
        //         if (valid(...p)) return freq(...p);
        //     }
        // }

        for (const [s1, , dx] of data) {
            const d1 = dx + 1;
            const [x1, y1] = s1;
            for (const [s2, , dy] of data) {
                const d2 = dy + 1;
                const [x2, y2] = s2;

                for (const xx1 of [d1, -d1]) for (const xx2 of [d2, -d2]) for (const xx3 of [y1 - y2, y2 - y1]) {
                    const xx = x1 + x2 + xx1 + xx2 + xx3;

                    for (const yy1 of [d1, -d1]) for (const yy2 of [d2, -d2]) for (const yy3 of [x1 - x2, x2 - x1]) {
                        const yy = y1 + y2 + yy1 + yy2 + yy3;
                        const p = [xx / 2, yy / 2];

                        if (valid(...p)) return freq(...p);
                    }
                }
            }
        }
    };

    return part == 1 ? part1(data) : part2(data);
};

module.exports = puzzle;
