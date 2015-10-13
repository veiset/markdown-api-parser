/*
 Parses data from markdown comments.

 Input:
    <!---
    author: Vegard
    published: 01.01.2015, 09:19
    -->
    # Some markdown text

 Output:
    { 
      file: 'filename.md'
      data: '# Some markdown text\n'
      author: ['Vegard'], 
      published: ['01.01.2015', '09:19'],
    }

*/

const META_START = '<!---';
const META_END = '-->';

function parseLine(line) {
    const strip = (arr) => arr.map(val => val.trim());
    const i = line.indexOf(':');
    const [name, vals] = [line.slice(0, i), line.slice(i+1).split(',')];
    return [name, strip(vals)];
}

export function defaultParser(filename, content) {
    const lines = content.toString('utf8').split('\n');

    const result = lines.reduce(([meta, isMeta], line) => {
        if (line === META_START) {
            isMeta = true;
        } else if (line === META_END) {
            isMeta = false;
        } else if (isMeta) {
            const [name, values] = parseLine(line);
            meta[name] = values;
        } else {
            meta.data += line + '\n';
        }
        return [meta, isMeta];
    }, [{ data: '' }, false])[0];

    return Object.assign({file: filename}, result);
}


