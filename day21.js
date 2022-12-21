const puzzle = (input, part) => {
    const data = input.split("\n").filter(x => !!x.trim())
    const cmds = {};
    for (const line of data) {
        if ((matches = line.match(/([^:]+): (.*)/))) {
            const [, id, cmd] = matches;
            if (isNaN(cmd)) {
                const [left, , right] = cmd.split(' ');
                cmds[id] = [cmd, [left, right]];
            } else {
                cmds[id] = [cmd, []];
            }
        }
    }

    const part1 = (root) => {
        const queue = [root];
        let str = cmds[root][0];
        while (queue.length) {
            const [, depends] = cmds[queue.shift()];
            for (const depend of depends) {
                str = str.replace(depend, `(${cmds[depend][0]})`);
                queue.push(depend);
            }
        }

        return eval(str);
    };

    const part2 = () => {
        const [cmd] = cmds['root'];
        const [rl, , rr] = cmd.split(' ');

        const left = part1(rl);
        const right = part1(rr);

        cmds['humn'][0]++;
        let target = left;
        let root = rr;

        if (part1(rr) == right) {
            target = right;
            root = rl;
        }

        let lo = Number.MIN_SAFE_INTEGER, hi = Number.MAX_SAFE_INTEGER, mid = 0;
        while (lo < hi) {
            mid = (lo + hi) / 2;
            cmds['humn'][0] = mid;
            score = target - part1(root);
            if (score < 0) {
                lo = mid;
            } else if (score == 0) {
                break;
            } else {
                hi = mid;
            }
        }

        return mid;
    };

    return part == 1 ? part1('root') : part2();
};

module.exports = puzzle;
