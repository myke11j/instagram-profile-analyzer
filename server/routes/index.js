
const express = require('express');

const router = express.Router();

require('./fetch-html.routes')(router);

module.exports = router;
