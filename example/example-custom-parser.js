import { processFiles } from '../src/main';

function countLines(filename, content) {
    const lines = content.toString('utf8').split('\n').length;
    return {filename, lines};
};

processFiles('example/markdown/*.md', countLines).then(d => console.log(d));

/*
console.log:

  [ 
    { filename: 'markdown/example.md', lines: 7 },
    { filename: 'markdown/example2.md', lines: 4 } 
  ]

*/
