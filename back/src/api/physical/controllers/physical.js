'use strict';

/**
 * physical controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::physical.physical');
