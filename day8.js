const puzzle = (input, part) => {
    const lines = input.split("\n").filter(x => !!x.trim());
    const grid = lines.map(x => x.split('').map(x => +x));

    const R = grid.length;
    const C = grid[0].length;
    
    const visible = (x, y, u, d, l, r) => {
        if (x == 0 || x == R - 1 || y == 0 || y == C - 1)
            return true;
        const v = grid[x][y];
        if (Math.max(...u) < v) return true;
        if (Math.max(...d) < v) return true;
        if (Math.max(...l) < v) return true;
        if (Math.max(...r) < v) return true;
    };

    const dist = (x, y, u, d, l, r) => {
        const v = grid[x][y];

        const helper = (arr) => {
            for (var i = 0; i < arr.length; ++i) if (arr[i] >= v) return i + 1;
            return arr.length;
        };
        return helper(u) * helper(d) * helper(l) * helper(r);
    }

    let part1 = 0, part2 = 0;
    for (var i = 0; i < R; ++i) {
        for (var j = 0; j < C; ++j) {
            const up = [...Array(i).keys()].map(x => grid[x][j]).reverse();
            const down = [...Array(R - i - 1).keys()].map(x => grid[R - 1 - x][j]).reverse();
            const left = [...Array(j).keys()].map(y => grid[i][y]).reverse();
            const right = [...Array(C - j - 1).keys()].map(y => grid[i][C - 1 - y]).reverse();

            if (visible(i, j, up, down, left, right)) part1++;
            part2 = Math.max(part2, dist(i, j, up, down, left, right));
        }
    }
    const result = part == 1 ? part1 : part2;
    return result;
};

module.exports = puzzle;
