const puzzle = (input, part) => {
    const lines = input.trim().split("\n").filter(x => !!x.trim());
    const blizzards = {
        '>': [1, 0],
        'v': [0, 1],
        '<': [-1, 0],
        '^': [0, -1]
    };

    const start = [lines[0].indexOf("."), 0];
    const end = [lines.at(-1).indexOf("."), lines.length - 1];

    const navigable = new Set(lines.map((r, i) => r
        .split('')
        .map((c, j) => c in blizzards || c == '.' ? [j, i].toString() : null)
        .filter(b => !!b)).flat());

    let winds = lines.map((r, i) => r
        .split('')
        .map((c, j) => c in blizzards ? [[j, i], blizzards[c]] : null)
        .filter(b => !!b)).flat();

    const adj = ([x, y]) => [[+x, +y]].concat(Object.values(blizzards).map(d => [+x, +y].map((a, i) => a + d[i])));

    let t = 0;
    let batch = new Set([start.toString()]);
    let goal = end;
    let stage = 1;

    while (true) {
        winds = winds.map(([p, d]) => {
            let [x, y] = p.map((a, i) => a + d[i]);
            if (!navigable.has([x, y].toString())) switch (d.toString()) {
                case '1,0': x = 1; break;
                case '0,1': y = 1; break;
                case '-1,0': x = lines[y].length - 2; break;
                case '0,-1': y = lines.length - 2; break;
            }
            return [[x, y], d];
        });

        const occupied = new Set(winds.map(([w]) => w.toString()));

        const nextBatch = [...batch.entries()]
            .map(([prev]) => adj(prev.split(',')).map(x => x.toString()))
            .flat()
            .filter(n => !occupied.has(n) && navigable.has(n));

        batch = new Set(nextBatch);

        if (batch.has(goal.toString())) {
            if (part == 1) return t + 1;

            if(stage == 1) {
                goal = start;
                stage = 2;
                batch = new Set([end.toString()]);
            } else if (stage == 2) {
                goal = end;
                stage = 3;
                batch = new Set([start.toString()]);
            } else {
                return t + 1;
            }
        }

        t++;
    }
};

module.exports = puzzle;
