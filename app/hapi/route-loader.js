import index from './route/index';
import logCreate from './route/log-create';
import logGetAll from './route/log-get-all';
import nodeCreate from './route/node-create';
import nodeGetAll from './route/node-get-all';
import nodeGetOne from './route/node-get-one';

export default function(server, persistence) {
  server.route(index(persistence));
  server.route(logCreate(persistence));
  server.route(logGetAll(persistence));
  server.route(nodeCreate(persistence));
  server.route(nodeGetAll(persistence));
  server.route(nodeGetOne(persistence));
}
