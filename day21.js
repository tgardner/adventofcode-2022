const puzzle = (input, part) => {
    const data = input.split("\n").filter(x => !!x.trim())

    const cmds = {};
    const values = {};

    for (const line of data) {
        if ((matches = line.match(/([^:]+): (.*)/))) {
            const [, id, cmd] = matches;
            if (isNaN(cmd)) {
                const depends = cmd.split(' ')
                cmds[id] = [id, cmd, [depends[0], depends[2]]];
            } else {
                cmds[id] = [id, cmd, []];
            }
        }
    }

    const part1 = (cmds, root = 'root') => {
        const queue = [root];
        let str = cmds[root][1];
        while (queue.length) {
            const [, , depends] = cmds[queue.shift()];
            for (var depend of depends) {
                str = str.replace(depend, `(${cmds[depend][1]})`);
                queue.push(depend);
            }
        }

        return eval(str);
    }

    const part2 = () => {
        const [, cmd] = cmds['root'];
        const [rl, , rr] = cmd.split(' ');

        const left = part1(cmds, rl);
        const right = part1(cmds, rr);

        cmds['humn'][1]++;
        let target = left;
        let root = rr;

        if (part1(cmds, rr) == right) {
            target = right;
            root = rl;
        }

        let lo = Number.MIN_SAFE_INTEGER, hi = Number.MAX_SAFE_INTEGER, mid = 0;
        while (lo < hi) {
            mid = (lo + hi) / 2;
            cmds['humn'][1] = mid;
            score = target - part1(cmds, root);
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

    return part == 1 ? part1(cmds) : part2();
};

module.exports = puzzle;
