import 'source-map-support/register';
import starter from './starter.js';

starter({hapi: {port: 4000}, mysql: {port: 3306}});
