const puzzle = (input, part) => {
    const data = input.split("\n").filter(x => !!x.trim())
        .map(line => (matches = line.match(/([^:]+): (.*)/)) && [matches[1], matches[2]]);
    const cmds = Object.fromEntries(data);

    const solve = (root, h = null) => {
        const queue = [root];
        let result = root;
        while (queue.length) {
            const v = queue.shift()
            const cmd = v == 'humn' && h != null ? h : cmds[v];
            result = result.replace(v, `(${cmd})`);
            if (isNaN(cmd)) {
                const [left, , right] = cmd.split(' ');
                queue.push(left, right);
            }
        }

        return eval(result);
    };

    const part2 = () => {
        const [rl, , rr] = cmds.root.split(' ');

        const left = solve(rl);
        const right = solve(rr);
        const h = solve(rr, +cmds.humn + 1);
        const target = h == right ? right : left;
        const root = h == right ? rl : rr;

        let lo = Number.MIN_SAFE_INTEGER, hi = Number.MAX_SAFE_INTEGER;
        while (lo < hi) {
            const mid = (lo + hi) / 2;
            const score = target - solve(root, mid);
            if (score < 0) lo = mid;
            else if (score > 0) hi = mid;
            else return mid;
        }
        return 0;
    };

    return part == 1 ? solve('root') : part2();
};

module.exports = puzzle;
