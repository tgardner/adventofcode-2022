const puzzle = (input, part) => {
    // 2-4,6-8
    const lines = input.split("\n").filter(x => !!x.trim())
        .map(l => l.split(',').map(g => g.split('-').map(x => +x)))
        .map(l => [l[0][0], l[0][1], l[1][0], l[1][1]]);
        
    const result = part == 1 ? 
        lines.filter(l => l[0] >= l[2] && l[1] <= l[3] || l[0] <= l[2] && l[1] >= l[3]).length : 
        lines.filter(l => !(l[1] < l[2] || l[3] < l[0])).length;
    console.log(result);
};

module.exports = puzzle;