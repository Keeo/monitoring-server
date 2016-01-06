import chai from 'chai';
import server from '../../app/hapi/server';
import winston from 'winston';
const { expect, assert } = chai;

describe('Index test', () => {
  before(() => winston.remove(winston.transports.Console));

  describe('Boot up', () => {
    it('It should start without exception.', done => {
      server().then(server => {
        server.start(() => done());
      });
    });
  });

  describe('Route testing.', () => {
    let serverInstance;
    beforeEach(done => {
      server().then(server => {
        serverInstance = server;
        serverInstance.start(() => done());
      });
    });

    it('it should fetch index route.', done => {
      serverInstance.inject({
        method: 'GET',
        url: '/api/'
      }, response => {
        assert.equal(response.statusCode, 200);
        assert.deepEqual(response.result, {api: 'hello!'});
        done();
      });
    });
  });
});
