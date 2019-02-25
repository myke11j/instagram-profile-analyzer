/**
 * @description Fetch data from html page using casperjs
 */


const cmd =require('node-cmd');

module.exports = (END_POINT) => new Promise((resolve, reject) => {
    try {
        // Endpoint is passed as command line arg
        return cmd.get(`casperjs scrap-insta.js ${END_POINT}`, (err, data, stderr) => {
                if (err) {
                    return reject(err);
                }                
                console.log(data);
                return resolve(JSON.parse(data));
            }
        );
    } catch (error) {
        console.log(error);
        reject(error)
    }  
});
