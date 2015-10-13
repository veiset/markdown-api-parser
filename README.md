# markdown-api-parser

Takes markdown files and generates a data set suitable for using as an API.

## Usage

```js
import { defaultParser, processFiles } from 'markdown-api-parser';

processFiles('example/markdown/*.md', defaultParser, (result) => {
    console.log(result);
});
```


## Input

**markdown/example.md**

```md
<!---
name: First!
tags: test, blog
published: 19.02.2015, 18:45
-->
# Welcome to my blog
Hello
```

**markdown/example2.md**

```md
<!---
name: Example 2
-->
# Example 2
```

## Output

```js
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
```
