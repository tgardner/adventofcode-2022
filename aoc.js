const fs = require('fs');
const args = process.argv.slice(2);
if(args.length == 0) {
    console.log(`node aoc day part`); process.exit(1);
}
const puzzle = require(`./day${args[0]}.js`);
const input = fs.readFileSync(`./day${args[0]}.txt`, 'utf-8');
const part = args.length >=2 ? args[1] == '1' ? 1 : 2 : 1;

// We'll strip out the \r depending on the filesystem we're running this from
puzzle(input.replace(/\r/g, ""), part);
