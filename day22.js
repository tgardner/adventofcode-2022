const puzzle = (input, part) => {
    const lines = input.split("\n").filter(x => !!x.trim());
    // R,D,L,U
    const dirs = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1]
    ];

    const maxX = Math.max(...lines.map(x => x.length));
    const map = lines.slice(0, -1)
        .map(line => line + " ".repeat(maxX - line.length));
    const moves = (matches = lines.slice(-1)[0]
        .match(/([0-9]+)([LR]?)/g))
        .map(x => [x.slice(0, -1), x.slice(-1)]).flat();

    const start = [map[0].indexOf('.'), 0];

    const part1 = ([x, y], [dx, dy], n) => {
        while (n > 0) {
            let [nx, ny] = [(x + dx + maxX) % maxX, (y + dy + map.length) % map.length];

            const pos = map[ny][nx];
            if (pos == '#') break;
            else if (pos == '.') [x, y] = [nx, ny];
            else {
                [dx, dy] = [dx + Math.sign(dx), dy + Math.sign(dy)];
                continue;
            }
            n--;
        }

        return [x, y];
    };

    const part2 = ([x, y], [dx, dy], n, d = 50) => {
        let [ox, oy] = [dx, dy];
        while (n > 0) {
            let [nx, ny] = [x + dx, y + dy];
            if (ny < 0 && nx >= d && nx < 2 * d && dy < 0) {
                //A-F
                [dx, dy] = [1, 0];
                [nx, ny] = [0, nx + 2 * d];
            }
            else if (nx < 0 && ny >= 3 * d && nx < 4 * d && dx < 0) {
                //F-A
                [dx, dy] = [0, 1];
                [nx, ny] = [ny - 2 * d, 0];
            }
            else if (nx == d - 1 && ny >= 0 && ny < d && dx < 0) {
                //A-E
                dx = 1;
                [nx, ny] = [0, 3 * d - 1 - ny];
            }
            else if (nx < 0 && ny >= 2 * d && ny < 3 * d && dx < 0) {
                //E-A
                dx = 1;
                [nx, ny] = [d, 3 * d - 1 - ny];
            }
            else if (nx == d - 1 && ny >= d && ny < 2 * d && dx < 0) {
                //C-E
                [dx, dy] = [0, 1];
                [nx, ny] = [ny - d, 2 * d];
            }
            else if (ny == 2 * d - 1 && nx >= 0 && nx < d && dy < 0) {
                //E-C
                [dx, dy] = [1, 0];
                [nx, ny] = [d, d + nx];
            }
            else if (nx == 2 * d && ny >= d && ny < 2 * d && dx > 0) {
                //C-B
                [dx, dy] = [0, -1];
                [nx, ny] = [d + ny, d - 1];
            }
            else if (ny == d && nx >= 2 * d && nx < 3 * d && dy > 0) {
                //B-C
                [dx, dy] = [-1, 0];
                [nx, ny] = [2 * d - 1, nx - d];
            }
            else if (ny < 0 && nx >= 2 * d && nx < 3 * d && dy < 0) {
                //B-F
                [nx, ny] = [nx - 2 * d, 4 * d - 1];
            }
            else if (ny >= 4 * d && nx >= 0 && nx < d && dy > 0) {
                //F-B
                [nx, ny] = [nx + 2 * d, 0];
            }
            else if (nx >= 3 * d && ny >= 0 && ny < d && dx > 0) {
                //B-D
                [dx, dy] = [-1, 0];
                [nx, ny] = [2 * d - 1, 3 * d - ny - 1];
            }
            else if (nx == 2 * d && ny >= 2 * d && ny < 3 * d && dx > 0) {
                //D-B
                [dx, dy] = [-1, 0];
                [nx, ny] = [3 * d - 1, 3 * d - ny - 1];
            }
            else if (nx == d && ny >= 3 * d && ny < 4 * d && dx > 0) {
                //F-D
                [dx, dy] = [0, -1];
                [nx, ny] = [ny - 2 * d, 3 * d - 1];
            }
            else if (ny == 3 * d && nx >= d && nx < 2 * d && dy > 0) {
                //D-F
                [dx, dy] = [-1, 0];
                [nx, ny] = [d - 1, nx + 2 * d];
            }

            const pos = map[ny][nx];
            if (pos == '#') break;
            [x, y] = [nx, ny];
            [ox, oy] = [dx, dy]

            n--;
        }
        return [x, y, ox, oy];
    };

    const follow = (start, part) => {
        let [x, y] = start;
        let [dx, dy] = dirs[0];
        while (moves.length) {
            const move = moves.shift();

            if (!isNaN(move)) {
                if (part == 1) {
                    [x, y] = part1([x, y], [dx, dy], +move);
                } else {
                    [x, y, dx, dy] = part2([x, y], [dx, dy], +move);
                }
            }
            else {
                [dx, dy] = move == 'R' ? [-dy, dx] : [dy, -dx];
            }
        }

        return 1000 * (y + 1) + 4 * (x + 1) + dirs.findIndex(d => d[0] == dx && d[1] == dy);
    };

    return follow(start, part);
};

module.exports = puzzle;
