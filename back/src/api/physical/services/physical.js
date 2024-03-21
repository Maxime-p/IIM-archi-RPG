'use strict';

/**
 * physical service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::physical.physical');
