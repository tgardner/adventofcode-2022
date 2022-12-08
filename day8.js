const puzzle = (input, part) => {
    const lines = input.split("\n").filter(x => !!x.trim());
    const grid = lines.map(x => x.split('').map(x => +x));

    const R = grid.length;
    const C = grid[0].length;

    const cross = (x, y) => {
        const up = [...Array(x).keys()].map(i => grid[i][y]).reverse();
        const down = [...Array(R - x - 1).keys()].map(i => grid[R - 1 - i][y]).reverse();
        const left = [...Array(y).keys()].map(i => grid[x][i]).reverse();
        const right = [...Array(C - y - 1).keys()].map(i => grid[x][C - 1 - i]).reverse();
        return [up, down, left, right];
    }

    const visible = (x, y) => {
        if (x == 0 || x == R - 1 || y == 0 || y == C - 1) return true;
        return cross(x, y).some(i => Math.max(...i) < grid[x][y]);
    };

    const dist = (x, y) => {
        const helper = (arr) => {
            for (var i = 0; i < arr.length; ++i) if (arr[i] >= grid[x][y]) return i + 1;
            return arr.length;
        };
        return cross(x, y).reduce((prod, i) => prod *= helper(i), 1);
    }

    let part1 = 0, part2 = 0;
    for (var i = 0; i < R; ++i) {
        for (var j = 0; j < C; ++j) {
            if (visible(i, j)) part1++;
            part2 = Math.max(part2, dist(i, j));
        }
    }
    const result = part == 1 ? part1 : part2;
    return result;
};

module.exports = puzzle;
