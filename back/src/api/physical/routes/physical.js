'use strict';

/**
 * physical router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::physical.physical');
