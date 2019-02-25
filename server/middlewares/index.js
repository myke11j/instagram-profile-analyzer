/**
 * @description Methods are to check if correct params/query/payload is coming for API
 * In case a parameter comes which is not specified, it will invalid format error
 */

const Response = require('../services/api-response');

const paramChecks = params => (req, res, next) => {
    if (!Array.isArray(params)) {
        throw new Error('Required field needs to be set');
    }
    const body = Object.keys(req.params);
    if (!body.length) return next();
    const flag = params.every(val => body.indexOf(val) >= 0);
    if (flag) {
        return next();
    }
    return Response.sendInvalidFormat({
        res,
        message: 'Field is missing from params'
    });
};

const bodyChecks = params => (req, res, next) => {
    if (!Array.isArray(params)) {
        throw new Error('Required field needs to be set');
    }
    const body = Object.keys(req.body);
    if (!body.length) return next();
    const flag = params.every(val => body.indexOf(val) >= 0);
    if (flag) {
        return next();
    }
    return Response.sendInvalidFormat({
        res,
        message: 'Field is missing from Payload'
    });
};

const queryChecks = params => (req, res, next) => {
    if (!Array.isArray(params)) {
        throw new Error('Required role needs to be set');
    }
    const query = Object.keys(req.query);
    if (!query.length) return next();
    const flag = query.every(val => params.indexOf(val) >= 0);
    if (flag) {
        return next();
    }
    return Response.sendInvalidFormat({
        res,
        message: 'Field is missing from query'
    });
};

module.exports = {
    paramChecks,
    bodyChecks,
    queryChecks
};
