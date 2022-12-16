const { ints } = require('./common.js');
const puzzle = (input, part) => {
    const dist = ([ax, ay], [bx, by]) => Math.abs(ax - bx) + Math.abs(ay - by);

    const data = input.split("\n").filter(x => !!x.trim())
        .map(ints)
        .map(([sx, sy, bx, by]) => [[sx, sy], [bx, by]])
        .map(([s, x], i) => [s, x, dist(s, x), i]);

    const part1 = (data, row = 2000000) => {
        const ranges = [];
        for (const [[sx, sy], [bx, by], d] of data) {
            const a = Math.abs(sy - row);
            if (d - a < 0) continue;

            const r = [sx - (d - a), sx + (d - a) + 1];
            ranges.push(r);

            // If our beacon is on this row, let's punch a hole in the range
            if (by == row) {
                ranges.push([bx + 1, r[1]]);
                r[1] = bx;
            }
        }

        ranges.sort((a, b) => a[0] - b[0]);

        let result = 0;
        let lastX = Number.NEGATIVE_INFINITY;
        for (let [min, max] of ranges) {
            if (min < lastX) min = lastX;
            if (max <= lastX) continue;
            result += max - min;
            lastX = max;
        }
        return result;
    };

    const part2 = (data, min = 0, max = 4000000) => {
        const freq = (x, y) => x * 4000000 + y;
        const valid = (x, y) => {
            if (x < min || y < min || x > max || y > max) return false;
            return data.every(([s, , d]) => d < dist(s, [x, y]));
        }

        for (const [[x1, y1], , dx] of data) for (const [[x2, y2], , dy] of data) {
            const [d1, d2] = [dx + 1, dy + 1];

            for (const xx1 of [d1, -d1]) for (const xx2 of [d2, -d2]) for (const xx3 of [y1 - y2, y2 - y1])
                for (const yy1 of [d1, -d1]) for (const yy2 of [d2, -d2]) for (const yy3 of [x1 - x2, x2 - x1]) {
                    const xx = x1 + x2 + xx1 + xx2 + xx3;
                    const yy = y1 + y2 + yy1 + yy2 + yy3;
                    const p = [xx / 2, yy / 2];

                    if (valid(...p)) return freq(...p);
                }
        }
    };

    return part == 1 ? part1(data) : part2(data);
};

module.exports = puzzle;
