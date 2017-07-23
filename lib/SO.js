let libxmljs = require('libxmljs'),
    utils = require('./utils.js'),
    https = require('https');

/**
 * Makes a HTTP GET request to the specified URL.
 * @param {String} url - URL to make a GET request to
 * @param {Function} callback - Callback function containing the returned XML String.
 */
function GetRequest(url, callback) {
    let xml = '';

    https.get(url, (res) => {
        res.on('data', (data) => {
            xml += data;
        });

        res.on('end', _ => {
            callback(xml);
        })
    });
}

module.exports.getCareers = (props, cb) => {
    var data = GetRequest(props.URL, (data) => {
        cb(data)
    });
};