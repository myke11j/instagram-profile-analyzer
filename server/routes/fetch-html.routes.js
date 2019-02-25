'use strict'

const {
  fetchHTML
} = require('../controllers/fetch-html.controller');
const { queryChecks } = require('../middlewares');

module.exports = (app) => {
  app.get('/fetch-html', queryChecks(['pageURL']), fetchHTML)
};
