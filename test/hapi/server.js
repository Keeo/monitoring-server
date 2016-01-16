import chai from 'chai';
import { getServerInstance } from './helper';
import winston from 'winston';
const { expect, assert } = chai;

describe('Index test', () => {
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

    it('it should fetch index route.', done => {
      hapi.inject({
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
