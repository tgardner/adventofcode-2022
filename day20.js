const puzzle = (input, part) => {
    const data = input.split("\n").filter(x => !!x.trim()).map((x, i) => [+x, i]);
    const solve = (data, iter) => {
        const mixed = [...data];

        for (let i = 0; i < iter; ++i) {
            for (const node of data) {
                let idx = mixed.findIndex(n => n[1] == node[1]);
                mixed.splice(idx, 1);
                mixed.splice((idx + node[0]) % mixed.length, 0, node);
            }
        }

        const start = mixed.findIndex(x => x[0] == 0);
        const coords = [1000, 2000, 3000].map(x => mixed[(start + x) % mixed.length][0]);
        return coords.reduce((sum, i) => sum += i, 0);
    };

    return part == 1 ? solve(data, 1) : solve(data.map(([x, i]) => [x * 811589153, i]), 10);
};

module.exports = puzzle;
