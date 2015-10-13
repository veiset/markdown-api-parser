import es from 'event-stream';
import reduce from 'stream-reduce';
import glob from 'glob';
import { createReadStream } from 'fs';

const dataAsList = () => reduce((list, data) => list.concat(data), []);
const processFile = (parser, file) => es.map((data, cb) => cb(null, parser(file, data)));

export function processFiles(filepath, parser, callback) {
    glob(filepath, {}, (er, files) => {
        const streams = files.map(file => 
            createReadStream(file)
                .pipe(processFile(parser, file)));

        es.merge(...streams)
            .pipe(dataAsList())
            .on('data', callback);
    });
}


