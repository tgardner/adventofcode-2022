const puzzle = (input, part) => {
    const elves = input.split("\n\n").map(x => x.split("\n").map(x => +x).reduce((sum, x) => sum + x, 0)).sort((a,b) => b - a);
    part == 1 ? console.log(elves[0]) : console.log(elves.slice(0, 3).reduce((sum, x) => sum + x, 0));
};

module.exports = puzzle;
