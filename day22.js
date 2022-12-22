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
    const password = ([x, y], dir) => 1000 * (y + 1) + 4 * (x + 1) + dir;
    const map = [];
    let moves = [];
    for (const line of lines) {
        if ((match = line.match(/([0-9]+)([LR]?)/g))) {
            moves = match.map(x => [x.slice(0, -1), x.slice(-1)]).flat();
            continue;
        }
        const row = Array(maxX);
        const p = line.split('');
        row.splice(0, p.length, ...p);
        map.push(row);
    }

    let p = [map[0].findIndex(m => m == '.'), 0];

    const follow = () => {
        let [x, y] = p;
        while (moves.length) {
            const move = moves.shift();

            if (!isNaN(move)) {
                const [dx, dy] = dirs[dir];

                // Follow direction n times
                for (let i = 0; i < +move; ++i) {
                    let [nx, ny] = [(x + dx + maxX) % maxX, (y + dy + map.length) % map.length];
                    next = map[ny][nx];
                    if (next == '#') break;
                    else if (next == '.') {
                        [x, y] = [nx, ny];
                    }
                    else {
                        // wrap
                        let i = 2;
                        while (next != '.' && next != '#') {
                            [nx, ny] = [(x + (i * dx) + maxX) % maxX, (y + (i * dy) + map.length) % map.length];
                            next = map[ny][nx];
                            i++;
                            if (next == '.') {
                                [x, y] = [nx, ny];
                            }
                        }
                    }
                }
                //console.log(x, y);
            } else {
                // Change direction
                dir = (dir + (move == 'R' ? 1 : -1) + dirs.length) % dirs.length;
            }
        }

        return password([x, y], dir);
    };

    return follow(p, dir, moves);
};

module.exports = puzzle;


// not 174042
// not 73354



///73346?