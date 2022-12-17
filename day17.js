const puzzle = (input, part) => {
    const shapes = `####

.#.
###
.#.

..#
..#
###

#
#
#
#

##
##`.replace(/\r/g, '').split('\n\n')
        .map(x => x.split('\n')
            .map((l, i) => l.trim().split('').reduce((arr, x, j) => { if (x === '#') arr.push([j, i]); return arr; }, [])).flat());

    const simulate = (input, rocks) => {
        const jets = input.trim().split('').map(x => x == '<' ? -1 : 1);
        const occupied = new Set();
        const obstructed = (v) => {
            for (const [x, y] of v) {
                if (y > 0 || x >= 7 || x < 0) return true;
                if (occupied.has([x, y].toString())) return true;
            }
            return false;
        }

        let mins = [];
        const seen = new Map();
        let occupiedMin = 1;
        let si = 0;
        let di = 0;
        let bonus = 0;
        let target = rocks - 1;
        while (true) {
            const shape = shapes[si % shapes.length];
            const maxY = Math.max(...shape.map(([, y]) => y));
            const startY = occupiedMin - 4 - maxY;
            let [ox, oy] = [2, startY];

            while (true) {
                const drift = jets[di % jets.length];
                let cur = shape.map(([x, y]) => [x + ox, y + oy]);
                if (!obstructed(cur.map(([x, y]) => [x + drift, y]))) {
                    cur = cur.map(([x, y]) => [x + drift, y]);
                    ox += drift;
                }

                di++;

                if (!obstructed(cur.map(([x, y]) => [x, y + 1]))) {
                    oy += 1;
                } else {
                    for (const x of cur) {
                        occupied.add(x.toString());
                        if (x[1] < occupiedMin) {
                            occupiedMin = x[1];
                        }
                    }
                    mins.push(occupiedMin);

                    if (si == target) {
                        return bonus - occupiedMin + 1;
                    }

                    const last6 = mins.slice(-6);
                    const memkey = [si % shapes.length, di % jets.length, Math.max(...last6) - Math.min(...last6)].toString();
                    if (!seen.has(memkey)) {
                        seen.set(memkey, [si, occupiedMin]);
                    } else {
                        if (target == rocks - 1) {
                            const [si_old, ans_old] = seen.get(memkey);
                            const period = si - si_old;
                            bonus = ((-(occupiedMin)) - (-ans_old)) * Math.floor((rocks - 1 - si) / period);
                            target = si + (rocks - 1 - si) % period;
                        }
                    }
                    break;
                }
            }
            si++;
        }
    }

    return part == 1 ? simulate(input, 2022) : simulate(input, 1000000000000);
};

module.exports = puzzle;
