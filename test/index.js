import chai from 'chai';
import server from '../app/server';
import winston from 'winston';
const { expect, assert } = chai;

describe('Index test', () => {
  before(() => winston.remove(winston.transports.Console));

  describe('Boot up', () => {
    it('It should start without exception.', done => {
      server().start(() => done());
    });
  });
});
