const puzzle = (input, part) => {
    // A Rock, B Paper, C Scissors
    // X Lose, Y Draw, Z win
    return input.split("\n")
        .filter(x => !!x.trim())
        .reduce((sum, x) => {
            const left = x[0] == 'A' ? 1 : x[0] == 'B' ? 2 : 3;
            const right = x[2] == 'X' ? 1 : x[2] == 'Y' ? 2 : 3;

            sum += part == 1 ?
                right + (left == right ? 3 : left % 3 == right - 1 ? 6 : 0) :
                (right == 1 ? 0 : right == 2 ? 3 : 6) + ((left + right) % 3) + 1;
            return sum;
        }, 0);
};

module.exports = puzzle;
