import Q from 'q';
import es from 'event-stream';
import reduce from 'stream-reduce';
import glob from 'glob';
import { createReadStream } from 'fs';
import { defaultParser } from './parser';

const dataAsList = () => reduce((list, data) => list.concat(data), []);
const processFile = (parser, file) => es.map((data, cb) => cb(null, parser(file, data)));

export function processFiles(filepath, parser=defaultParser) {
    const defer = Q.defer();

    glob(filepath, {}, (err, files) => {
        if(err || !files.length) {
            return defer.reject(err ? err : { error: 'No files match' });
        }
        const streams = files.map(file =>
            createReadStream(file)
                .pipe(processFile(parser, file)));

        es.merge(...streams)
            .pipe(dataAsList())
            .on('data', defer.resolve);
    });

    return defer.promise;
}
