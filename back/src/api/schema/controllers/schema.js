'use strict';

/**
 * schema controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::schema.schema');
