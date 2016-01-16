import { error } from 'winston';

/**
 * @param {Persistence} persistence
 * @returns {{method: string, path: string, config: {auth: string, validate: {params: {id: *}}}, handler: (function(*, *))}}
 */
export default function(persistence) {
  return {
    method: 'POST',
    path: '/api/user/login',
    config: {
      auth: false
    },
    handler(request, reply) {
      let user =  request.payload.user;
      persistence.getModel('user').findOne({where: {password: user.password, email: user.email}, raw: true}).then(user => {
        if (user) {
          reply(user);
        } else {
          reply({errors: [{status: '401', title: 'Authorization failed.'}]}, 401);
        }
      }, err => {
        error(err);
        reply(err);
      });
    }
  };
}
