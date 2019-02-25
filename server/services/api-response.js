/**
 * @description Module is to send HTTP responses in a common format
 */

const Response = {
    sendSuccess: async (params) => {
        const {
            res, message, data = []
        } = params;        
        res.set('Content-Type', 'text/plain');
        return res.status(200).send(JSON.stringify({
            message: message || 'Successful',
            data,
            code: 200
        }));
    },

    sendFailure: (params) => {
        const {
            res, message
        } = params;
        return res.status(500).send({
            message: message || 'API failed',
            data: [],
            code: 500
        });
    },

    sendInvalidFormat: (params) => {
        const {
            res, message
        } = params;
        return res.status(200).send({
            message: message || 'Invalid format',
            data: [],
            code: 400
        });
    },

    sendInvalidPrompt: (params) => {
        const {
            res, message
        } = params;
        return res.status(200).send({
            message: message || 'Validation Error',
            data: [],
            code: 113
        });
    }
};

module.exports = Response;
