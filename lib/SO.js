let xml2js = require('xml2js').parseString,
    utils = require('./utils.js'),
    https = require('https');

    
/**
 * Makes a HTTP GET request to the specified URL.
 * @param {String} url - URL to make a GET request to
 * @param {Function} callback - Callback function containing the returned XML String.
 */
function GetRequest(url, callback) {
    let xml = '';

    https.get(url, (result) => {
        result.on('data', (data) => {
            xml += data;
        });

        result.on('end', _ => {
            callback(xml);
        });
    });
}

/**
 * Splits an array into a properly formatted string for URL 
 * @param {Array} arr - The array to split and restructure 
 */
function arrToUrl(arr) {
    if(arr.length == 1) {
        return arr[0];
    }

    let stringified = arr[0];

    for(var i = 1; i < arr.length; i++) {
        stringified += `+${arr[i]}`
    }

    return stringified;
}

/**
 * Builds the URL to make a GET request to.
 * @param {Object} props - Passed to getCareers as an object with search parameters.
 */
function UrlBuilder(props) {

    let builtUrl = utils.UrlPrefix;

    if(props.query) { builtUrl += props.query }

    if(props.location) { builtUrl += utils.Location + props.location }

    if(props.td) { 
        builtUrl += utils.TechDisliked + arrToUrl(props.td) 
    }

    if(props.tl) { 
        builtUrl += utils.TechLiked + arrToUrl(props.tl) 
    }

    if(props.unit) { builtUrl += utils.Unit + props.unit }

    return builtUrl;
}

module.exports.getCareers = (props, cb) => {

    if(!utils.validObject(props)) {
        console.log('ERROR: Query object cannot be empty.');
        return;
    }

    let url = UrlBuilder(props);

    var data = GetRequest(url, (data) => {
        console.log(url)
        xml2js(data, (err, jobs) => {
            cb(jobs.rss.channel[0].item)
        });
    });
};