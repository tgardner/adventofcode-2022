const puzzle = (input, part) => {
    const lines = input.split("\n").map(l => l.trim()).filter(l => !!l);
    let pwd = [];
    const sizes = {};

    for (const line of lines) {
        if (line.startsWith('$ cd /')) pwd = [];
        else if (line.startsWith('$ cd ..')) pwd.pop();
        else if (line.startsWith('$ cd')) pwd.push(line.split(' ')[2]);
        else if (line.startsWith('$ ls')) continue;
        else if (line.startsWith('dir')) continue;
        else if ((matches = /(\d+) (.*)/.exec(line))) {
            for (let i = 0; i < pwd.length; ++i) {
                const path = '/' + pwd.slice(0, i + 1).join('/');
                sizes[path] = (sizes[path] || 0) + +matches[1];
            }
            sizes['/'] = (sizes['/'] || 0) + +matches[1];
        }
    }

    if (part == 1) {
        const result = Object.values(sizes).filter(s => s < 100000).reduce((sum, x) => sum += x, 0);
        console.log(result);
    } else {
        const needed = 70000000 - 30000000;
        const result = Object.values(sizes).filter(s => s >= sizes['/'] - needed).sort((a, b) => a - b)[0];
        console.log(result);
    }
};

module.exports = puzzle;
