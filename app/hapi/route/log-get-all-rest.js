import { error } from 'winston';
import Joi from 'joi';
import queryModifier from '../../utils/query-modified';
import orderParser from '../../utils/order-parser';

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
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: Joi.object({
                logs: Joi.array().items(
                  Joi.object({
                    severity: Joi.string().required(),
                    message: Joi.string().required(),
                    context: Joi.string(),
                    created: Joi.string()
                  })
                ), meta: Joi.object({
                  page: Joi.number().min(1).default(1).required(),
                  perPage: Joi.number().default(30).min(1).max(1000).required(),
                  nextPage: Joi.number().min(1).required(),
                  prevPage: Joi.number().min(1).required(),
                  totalPageCount: Joi.number().min(1).required()
                }).required()
              }).label('Result')
            },
            400: {description: 'Bad Request'}
          }
        }
      },
      validate: {
        query: {
          order: Joi.string().default('-id'),
          node: Joi.number().integer().min(0).required(),
          page: Joi.number().integer().min(1).default(1),
          perPage: Joi.number().integer().min(1).max(1000).default(30)
        }
      }
    },
    handler(request, reply) {
      const node = request.query.node;
      const order = request.query.order;
      const page = request.query.page;
      const perPage = request.query.perPage;
      persistence.getModel('log').findAndCountAll({
        limit: perPage,
        offset: perPage * (page - 1),
        raw: true,
        where: {node: node},
        order: orderParser(order)
      }).then(({ count, rows }) => {
        const totalPageCount = Math.max(Math.ceil(count / perPage), 1);
        const url = request.connection.info.protocol + '://' + request.info.host + request.url.path;
        const nextUrl = queryModifier(url, {page: Math.min(page + 1, totalPageCount)});
        const prevUrl = queryModifier(url, {page: Math.max(page - 1, 1)});
        const lastUrl = queryModifier(url, {page: totalPageCount});
        const linkHeader = `<${prevUrl}>; rel="prev", <${nextUrl}>; rel="next", <${lastUrl}>; rel="last"`;
        reply({
          logs: rows,
          meta: {
            page: page,
            perPage: perPage,
            nextPage: Math.min(page + 1, totalPageCount),
            prevPage: Math.max(page - 1, 1),
            totalPageCount: totalPageCount
          }
        }).header('X-Total-Page-Count', totalPageCount).header('LINK', linkHeader);
      }, err => {
        error(err);
        reply(err);
      });
    }
  };
}
