const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
	input: fs.createReadStream('test.csv')
});

rl.on('line', (line) => {
	var l=line.split(',');
	console.log(l[3]);
});
