const xml2js = require('xml2js').parseString,
    utils = require('./utils.js'),
    https = require('https');

const EncodedChars = [
    { '!': '%21' },
    { '"': '%22' },
    { '#': '%23' },
    { '$': '%24' },
    { '%': '%25' },
    { '&': '%26' },
    { '\'': '%27' },
    { '(': '%28' },
    { ')': '%29' },
    { '*': '%2A' },
    { '+': '%2B' },
    { ',': '%2C' },
    { '-': '%2D' },
    { '.': '%2E' },
    { '/': '%2F' },
];
    
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

    return arr.join('+');
}

/**
 * Builds the URL to make a GET request to.
 * @param {Object} props - Passed to getCareers as an object with search parameters.
 */
function UrlBuilder(props) {

    let builtUrl = utils.UrlPrefix;

    if(props.query) { builtUrl += props.query }

    if(props.location) { builtUrl += utils.Location + props.location }

    if(props.techDisliked) { 
        builtUrl += utils.TechDisliked + arrToUrl(props.techDisliked) 
    }

    if(props.techLiked) { 
        builtUrl += utils.TechLiked + arrToUrl(props.techLiked) 
    }

    if(props.unit) { builtUrl += utils.Unit + props.unit }

    return builtUrl;
}

/**
 * @property {Object} props - Properties for your search
 * @property {String} query - Additional information for the search (eg. "Junior" or "remote full time" etc).
 * @property {String} location - Location for the job search. Make this as specific as possible.
 * @property {String[]} techLiked - An array of technologies prefered. (eg. ["javascript", "c", "Java", "wordpress"])
 * @property {String[]} techDisliked - An array of technologies to filter out. (eg. ["fortran", "c++", "AWS"])
 * @property {String} Unit - Unit of measurement for distance. Typically this should be miles.
 * @param {Function} cb - Callback for the array of objects returned.
 */
function getCareers(props, cb) {

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

module.exports = {
    getCareers,
};