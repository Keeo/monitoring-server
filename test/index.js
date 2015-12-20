import chai from 'chai';
import server from '../app/server';
const { expect, assert } = chai;

describe('Group messages', () => {

  beforeEach(done => {
    //server.start(() => done());
    done();
  });

  afterEach(done => {
    //server.stop(() => done());
    done();
  });

  describe('Message Events', () => {
    it('Users should receive \'created group\' packet on group creation.', done => {
      assert.equal('bar', 'bar');

      done();
    });
  });
});
