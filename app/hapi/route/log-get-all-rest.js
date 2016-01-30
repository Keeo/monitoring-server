// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
import { error } from 'winston';
import Joi from 'joi';
import queryModifier from '../../utils/query-modified';

/**
 * @param {Persistence} persistence
 * @returns {{method: string, path: string, config: {validate: {params: {node: *, limit: *}}}, handler: (function(*, *))}}
 */
export default function(persistence) {
  return {
    method: 'GET',
    path: '/api/logs',
    config: {
      auth: 'user',
      validate: {
        query: {
          node: Joi.number().integer().min(0).required(),
          page: Joi.number().integer().min(1).default(1),
          per_page: Joi.number().integer().min(1).max(1000).default(30)
        }
      }
    },
    handler(request, reply) {
      const node = request.query.node;
      const page = request.query.page;
      const perPage = request.query.per_page;
      persistence.getModel('log').findAndCountAll({limit: perPage, offset: perPage * (page - 1), raw: true, where: {node: node}}).then(({ count, rows }) => {
        const totalPageCount = Math.ceil(count / perPage);
        const url = request.connection.info.protocol + '://' + request.info.host + request.url.path;
        const nextUrl = queryModifier(url, {page: Math.min(page + 1, totalPageCount)});
        const prevUrl = queryModifier(url, {page: Math.max(page - 1, 1)});
        const lastUrl = queryModifier(url, {page: totalPageCount});
        const linkHeader = `<${prevUrl}>; rel="prev", <${nextUrl}>; rel="next", <${lastUrl}>; rel="last"`;
        reply({logs: rows.map(l => l.id)}).header('X-Total-Page-Count', totalPageCount).header('LINK', linkHeader);
      }, err => {
        error(err);
        reply(err);
      });
    }
  };
}
