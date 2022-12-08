const year = 2022;

const fs = require('fs');
const https = require('https');
const args = process.argv.slice(2);
if (args.length == 0 || isNaN(args[0])) {
    console.log(`node aoc day part`); process.exit(1);
}

const day = +args[0];
const inputFile = `./day${day}.txt`;
const sessionFile = './session.txt';

const runPuzzle = () => {
    const puzzle = require(`./day${day}.js`);
    const input = fs.readFileSync(inputFile, 'utf-8');
    const part = args.length >= 2 ? args[1] == '1' ? 1 : 2 : 1;

    // We'll strip out the \r depending on the filesystem we're running this from
    puzzle(input.replace(/\r/g, ""), part);
};

if (!fs.existsSync(inputFile)) {
    console.log("Retrieving input file");
    const session = fs.readFileSync(sessionFile);

    https.request({
        host: 'adventofcode.com',
        path: `/${year}/day/${day}/input`,
        headers: {
            "Cookie": `session=${session}`
        }
    }, res => {
        res.on('data', chunk => fs.writeFileSync(inputFile, chunk, { flag: 'a' }));
        res.on('end', runPuzzle);
    }).end();
} else {
    runPuzzle();
}
