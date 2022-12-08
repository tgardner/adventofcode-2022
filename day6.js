const puzzle = (input, part) => {
    const n = part == 1 ? 4 : 14;
    let i = 0;
    while (input.substring(i, i + n).split('').filter((x, i, s) => s.indexOf(x) === i).length !== n) ++i;
    return i + n;
};

module.exports = puzzle;
