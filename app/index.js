import 'source-map-support/register';
import { info } from 'winston';
import server from './server.js';

server({port: 4000}).start(() => info('Server started'));

