const xml2js = require('xml2js').parseString,
      Utils = require('./Utils.js').Utils,
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
function ArrToUrl(arr) {
    return arr.length === 1 ? arr[0] : arr.join('+');
}

/**
* Builds the URL to make a GET request to.
* @param {Object} props - Passed to getCareers as an object with search parameters.
*/
function UrlBuilder(props) {

    let builtUrl = Utils.UrlPrefix;

    if(props.query) { builtUrl += props.query }

    if(props.location) { builtUrl += Utils.Location + props.location }

    if(props.techDisliked) { 
        let EncodedTechDisliked = [];
        props.techDisliked.forEach((tech) => {
            EncodedTechDisliked.push(Utils.EncodeProtectedCharacters(tech))
        });

        builtUrl += Utils.TechDisliked + ArrToUrl(EncodedTechDisliked);
    }

    if(props.techLiked) { 
        let EncodedTechLiked = [];
        props.techLiked.forEach((tech) => {
            EncodedTechLiked.push(Utils.EncodeProtectedCharacters(tech))
        });

        builtUrl += Utils.TechLiked + ArrToUrl(EncodedTechLiked);
    }

    if(props.unit) { builtUrl += Utils.Unit + props.unit }

    return builtUrl;
}

/**
* @param {Object} props - Properties for your search
* @param {String} props.query - Additional information for the search (eg. "Junior" or "remote full time" etc).
* @param {String} props.location - Location for the job search. Make this as specific as possible.
* @param {String[]} props.techLiked - An array of technologies prefered. (eg. ["javascript", "c", "Java", "wordpress"])
* @param {String[]} props.techDisliked - An array of technologies to filter out. (eg. ["fortran", "c++", "AWS"])
* @param {String} props.unit - Unit of measurement for distance. Typically this should be miles.
* @param {Function} cb - Callback for the array of objects returned.
*/
function getCareers(props, cb) {
    const url = UrlBuilder(props);

    GetRequest(url, (data) => {
        xml2js(data, (err, jobs) => {
            cb(jobs.rss.channel[0].item)
        });
    });
};

module.exports = {
    getCareers,
};