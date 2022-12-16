const {memoize} = require("./common.js");
const puzzle = (input, part) => {
    const data = input.split("\n").filter(x => !!x.trim())
        .map(l => l.match(/Valve ([A-Z]+).*rate=(\d+);.*valves? ([A-Z, ]+)$/))
        .map(([, id, f, tun], i) => [id, +f, tun.split(', '), i]);

    const start = data.findIndex(d => d[0] == 'AA');

    // Floyd-Warshall
    const dist = [...Array(data.length).keys()].map(_ => [...Array(data.length).keys()].map(_ => 99));
    for (const [, , tunnels, i] of data) for (const tun of tunnels)
        dist[i][data.findIndex(d => d[0] == tun)] = 1;

    for (let k = 0; k < data.length; ++k) for (let i = 0; i < data.length; ++i) for (let j = 0; j < data.length; ++j)
        if (dist[i][j] > dist[i][k] + dist[k][j]) dist[i][j] = dist[i][k] + dist[k][j];

    const choose = (xs) => xs.map(([, , , x], i) => [x, xs.filter((_, j) => j != i)]);
    const dfs = (cur, rest, t) => {
        if (t <= 0) return 0;
        let best = 0;
        for (const [r, rr] of choose(rest)) {
            if (dist[cur][r] >= t) continue;

            const [, f] = data[r];
            best = Math.max(best, f * (t - dist[cur][r] - 1) + part1(r, rr, t - dist[cur][r] - 1));
        }
        return best;
    };
    const part1 = memoize(dfs, (...args) => args.map(a => a.toString()).join('|'));

    const part2 = (cur, rest, t) => {
        if (t <= 0) return 0;
        let best = 0;
        for (const [r, rr] of choose(rest)) {
            if (dist[cur][r] >= t) continue;

            const [, f] = data[r];
            best = Math.max(best, f * (t - dist[cur][r] - 1) + part2(r, rr, t - dist[cur][r] - 1));
        }
        return Math.max(best, part1(start, rest, 26));
    };

    const flows = data.filter(([, f]) => f > 0);
    return part == 1 ? part1(start, flows, 30) : part2(start, flows, 26);
};

module.exports = puzzle;
