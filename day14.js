const puzzle = (input, part) => {
    const fill = (st, end) => {
        const result = [];
        while (st.some((x, i) => x != end[i])) {
            st = st.map((x, i) => x + Math.sign(end[i] - x));
            result.push(st);
        }
        return result;
    }

    const rocks = input.split("\n")
        .filter(x => !!x.trim())
        .map(x => x.split(' -> ').map(y => y.split(',').map(z => +z)))
        .map((r) => r.map((c, i) => i == 0 ? [c] : fill(r[i - 1], c)).flat())
        .flat();

    const maxY = Math.max(...rocks.map(x => x[1])) + 2;

    if (part == 2) {
        rocks.push(...[...Array(2000).keys()].map(x => [x - 1000, maxY]));
    }

    const blocked = new Set(rocks.map(x => x.toString()));
    let cnt = 0;
    const dfs = (x) => {
        if (blocked.has(x.toString())) return true;
        if (x[1] > maxY) return false;

        const offsets = [[0, 1], [-1, 1], [1, 1]];
        const next = offsets.every(o => dfs([x[0] + o[0], x[1] + o[1]]));
        if (next) {
            blocked.add(x.toString());
            ++cnt;
        }
        return next;
    }

    dfs([500, 0]);

    return cnt;
};

module.exports = puzzle;
