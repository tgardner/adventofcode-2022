const year = 2022;

const fs = require('fs');
const path = require('path');
const https = require('https');
const args = process.argv.slice(2);
if (args.length == 0) {
    console.log(`node aoc dayX.js part`); process.exit(1);
}

const day = +path.basename(args[0]).replace(/\D/g, '');
const part = args.length >= 2 ? args[1] == '1' ? 1 : 2 : 1;
const inputFile = args[0].replace('.js', '.txt');
const sessionFile = path.join(path.dirname(inputFile), '.session');

const runPuzzle = () => {
    const puzzle = require(args[0]);
    // We'll strip out the \r depending on the filesystem we're running this from
    const input = fs.readFileSync(inputFile, 'utf-8').replace(/\r/g, "");

    const startTime = performance.now();
    const result = puzzle(input, part);
    const endTime = performance.now();
    console.log(result);
    console.debug(`Execution time: ${endTime - startTime}ms`);
};

if (!fs.existsSync(inputFile)) {
    console.log("Retrieving input file");
    const session = fs.readFileSync(sessionFile);
    https.get({
        host: 'adventofcode.com',
        path: `/${year}/day/${day}/input`,
        headers: {
            "Cookie": `session=${session}`
        }
    }, res => {
        if (res.statusCode != 200) {
            console.log("Failed to retrieve input file - ", res.statusMessage);
            return;
        }
        res.on('data', chunk => fs.writeFileSync(inputFile, chunk, { flag: 'a' }));
        res.on('end', runPuzzle);
    }).end();
} else {
    runPuzzle();
}
