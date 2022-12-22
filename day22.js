const puzzle = (input, part) => {
    const lines = input.split("\n").filter(x => !!x.trim());
    // R,D,L,U
    const dirs = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1]
    ];
    let dir = 0;

    const maxX = Math.max(...lines.map(x => x.length));
    const map = lines.slice(0, -1)
        .map(line => [...line.split(''), ...Array(maxX)].slice(0, maxX));
    const moves = (matches = lines.slice(-1)[0]
        .match(/([0-9]+)([LR]?)/g))
        .map(x => [x.slice(0, -1), x.slice(-1)]).flat();

    let p = [map[0].findIndex(m => m == '.'), 0];

    const next = ([x, y], dir, n) => {
        let [dx, dy] = dirs[dir];
        while (n > 0) {
            let [nx, ny] = [(x + dx + maxX) % maxX, (y + dy + map.length) % map.length];
            const pos = map[ny][nx];
            if (pos == '#') break;
            else if (pos == '.') [x, y] = [nx, ny];
            else {
                [dx, dy] = [dx + Math.sign(dx), dy + Math.sign(dy)]
                continue;
            }
            n--;
        }
        return [x, y];
    };

    const follow = () => {
        let [x, y] = p;
        while (moves.length) {
            const move = moves.shift();

            if (!isNaN(move))
                [x, y] = next([x, y], dir, +move);
            // Change direction
            else
                dir = (dir + (move == 'R' ? 1 : -1) + dirs.length) % dirs.length;
        }

        return 1000 * (y + 1) + 4 * (x + 1) + dir;
    };

    return follow(p, dir, moves);
};

module.exports = puzzle;
