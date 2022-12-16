const puzzle = (input, part) => {
    const data = input.split("\n").filter(x => !!x.trim())
        .map(l => l.match(/Valve ([A-Z]+).*rate=(\d+);.*valves? ([A-Z, ]+)$/))
        .map(m => [m[1], [+m[2], m[3].split(', ')]]);

    const map = Object.fromEntries(data);

    const maxflow = (cur, opened, t) => {
        if (t <= 0) return 0;
        if (opened.indexOf(cur) >= 0) return 0;

        let best = 0;
        const [f, tun] = map[cur];
        const val = (t - 1) * f;
        const cur_opened = opened.concat([cur]);
        for (const adj of tun) {
            if (val != 0) {
                best = Math.max(best, val + maxflow(adj, cur_opened, t - 2));
            }
            best = Math.max(best, maxflow(adj, cur_opened, t - 1));
        }
        return best;
    }

    const part1 = maxflow("AA", [], 30);

    const part2 = (cur, opened, t) => {
        if (t <= 0) return maxflow("AA", opened, 26);

        best = 0;
        const [f, tun] = map[cur];
        for (const adj of tun)
            best = Math.max(best, part2(adj, [...opened], t - 1));

        if (opened.indexOf(cur) < 0 && f > 0) {
            const cur_opened = opened.concat([cur]);
            --t;
            let sum = t * f;
            for (const adj of tun)
                best = Math.max(best, sum + part2(adj, cur_opened, t - 1))
        }
        return best;
    };

    return part == 1 ? part1 : part2('AA', [], 26);
};

module.exports = puzzle;

//not 234
//not 1084