import { expect, assert } from 'chai';
import { getServerInstance, getPersistenceInstance } from './helper';
import winston from 'winston';

describe('Basic rest api server test', () => {
  before(() => winston.remove(winston.transports.Console));

  describe('Boot up', () => {
    it('It should start without exception.', done => {
      getServerInstance().then(() => done());
    });
  });

  describe('Route testing.', () => {
    let hapi;
    let server;
    beforeEach(done => {
      getServerInstance().then(ser => {
        server = ser;
        hapi = ser.server;
        done();
      });
    });

    it('It should fetch index route.', done => {
      hapi.inject({
        method: 'GET',
        url: '/api/'
      }, response => {
        assert.equal(response.statusCode, 200);
        assert.deepEqual(response.result, {api: 'hello!'});
        done();
      });
    });

    it('Log creation route.', done => {
      server.persistence.getModel('node').find({raw: true}).then(node => {
        let log = {severity: 'info', message: 'it should work'};
        hapi.inject({
          method: 'POST',
          url: '/api/log/',
          credentials: node,
          payload: {log: log}
        }, response => {
          assert.equal(response.statusCode, 200);
          let returnedLog = response.result;
          assert.equal(returnedLog.node, node.id);
          assert.equal(returnedLog.severity, log.severity);
          assert.equal(returnedLog.message, log.message);
          assert.equal(returnedLog.context, undefined);
          done();
        });
      });
    });
  });
});
