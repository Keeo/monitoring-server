import { error } from 'winston';
import minimist from 'minimist';
import Generate from './cli/generate';

const argv = minimist(process.argv.slice(2));
const task = argv._[0];
argv._ = argv._.slice(1);

switch (task) {
  case 'generate':
    (new Generate()).generate(argv);
    break;
  default:
    error('Wrong input.');
}
