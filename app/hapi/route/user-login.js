import { error } from 'winston';
import generators from '../../generator/generators';

/**
 * @param {Persistence} persistence
 * @returns {{method: string, path: string, config: {auth: string, validate: {params: {id: *}}}, handler: (function(*, *))}}
 */
export default function(persistence) {
  return {
    method: 'POST',
    path: '/api/users/login',
    config: {
      auth: false
    },
    handler(request, reply) {
      let {email, password} =  request.payload || {};
      if (!email || !password) {
        return reply().code(400);
      }
      persistence.getModel('user').findOne({where: {email: email}}).then(user => {
        if (!user) {
          return reply({errors: [{status: '401', title: 'Authorization failed.'}]}).code(401);
        }
        const hash = generators.crypto.getHash(password, user.salt);
        if (user && user.password === hash) {
          user.hash = generators.crypto.getToken();
          user.save().then(user => {
            return reply({user: user.get({plain: true})});
          });
        } else {
          return reply({errors: [{status: '401', title: 'Authorization failed.'}]}).code(401);
        }
      }, err => {
        error(err);
        reply(err);
      });
    }
  };
}
