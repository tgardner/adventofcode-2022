const puzzle = (input, part) => {
    const elves = input.split("\n\n").map(x => x.split("\n").map(x => +x).reduce((sum, x) => sum + x, 0)).sort((a,b) => b - a);
    return part == 1 ? elves[0] : elves.slice(0, 3).reduce((sum, x) => sum + x, 0);
};

module.exports = puzzle;
