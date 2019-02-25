/* eslint-disable strict */

'use strict'

const fetchService = require('../services/fetch.service');

const {
    sendSuccess, sendFailure
} = require('../services/api-response')


const fetchHTML = (req, res) => {
    try {
        const {
            pageURL
        } = req.query;
        /**
         * Runs a phantomjs shell script and loads insta scrapper
         */
        return fetchService(pageURL)
            .then((response) => {
                return sendSuccess({
                    res,
                    message: 'Successfully fetched data',
                    data: response
                })
            })
            .catch((err) => {
                return sendFailure({
                    res,
                    message: `Unable to fetch page requested ${err}}`
                })
            });
    } catch (err) {
        console.log(err);
        return sendFailure({
            res,
            message: `Unable to fetch page requested ${err}` 
        })
    }
};

module.exports = {
    fetchHTML
};
