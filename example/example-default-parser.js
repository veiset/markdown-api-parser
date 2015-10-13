import { defaultParser, processFiles } from '../src/main';

processFiles('example/markdown/*.md', defaultParser, (result) => {
    console.log(result);
});

/*
console.log:

  [ 
    { 
      file: 'markdown/example.md',
      data: '# Welcome to my blog\nHello\n',
      name: [ 'First!' ],
      tags: [ 'test', 'blog' ],
      published: [ '19.02.2015', '18:45' ] 
    },
    { 
      file: 'markdown/example2.md',
      data: '# Example 2\n',
      name: [ 'Example 2' ] 
    } 
  ]

*/