const puzzle = (input, part) => {
    const map = input.split("\n").filter(x => !!x.trim()).map(r => r.split(''));
    const height = (x) => x.toLowerCase() == x ? x.charCodeAt(0) - 97 : x == 'S' ? 0 : 25;

    let start, end;
    for (let i = 0; i < map.length; ++i)
        for (let j = 0; j < map[0].length; ++j) {
            if (map[i][j] == 'S') start = [i, j];
            else if (map[i][j] == 'E') end = [i, j];
            map[i][j] = height(map[i][j]);
        }

    const adj = (x, y) => [[-1, 0], [1, 0], [0, 1], [0, -1]]
        .map(d => [x + d[0], y + d[1]])
        .filter(d => d[0] >= 0 && d[0] < map.length && d[1] >= 0 && d[1] < map[0].length)
        .filter(d => map[x][y] - map[d[0]][d[1]] <= 1);

    const seen = new Set([end.toString()]);
    let dist = 1;
    let batch = [end];
    let next = [];
    while (batch.length > 0) {
        for (st of batch) {
            for (t of adj(st[0], st[1])) {
                if (seen.has(t.toString())) continue;

                if (part == 1 && t[0] == start[0] && t[1] == start[1] ||
                    part == 2 && map[t[0]][t[1]] == 0) return dist;

                seen.add(t.toString());
                next.push(t);
            }
        }

        batch = next;
        next = [];
        dist++;
    }
};

module.exports = puzzle;
