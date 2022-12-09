const puzzle = (input, part) => {
    const reverse = part == 1;
    const lines = input.split("\n").filter(x => !!x.trim());
    const moves = []; let moveStart = 0;
    for (var i = 0; i < lines.length; ++i) {
        if ((matches = /^move (\d*) from (\d*) to (\d*)$/.exec(lines[i]))) {
            if (!moveStart) moveStart = i;
            moves.push([matches[1], matches[2], matches[3]]);
        }
    }
    const stacks = lines[moveStart - 2].split(' ').filter(s => !!s.trim()).map(_ => []);
    for (var i = 0; i < moveStart - 1; ++i) {
        for (var j = 0; j < stacks.length; ++j) {
            if (!lines[i][4 * (j) + 1].trim()) continue;
            stacks[j].push(lines[i][4 * (j) + 1]);
        }
    }
    for (var i = 0; i < moves.length; ++i) {
        let toMove = stacks[moves[i][1] - 1].splice(0, moves[i][0]);
        if (reverse) toMove = toMove.reverse();
        stacks[moves[i][2] - 1] = [...toMove, ...stacks[moves[i][2] - 1]];
    }
    return stacks.map(s => s[0]).join('');
};

module.exports = puzzle;
