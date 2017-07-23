let utils = {
    UrlPrefix: 'https://stackoverflow.com/jobs/feed?q=',
    Location: "&l=",
    Unit: "&u=",
    TechLiked: "&tl=",
    TechDisliked: "&td=",

    validObject: (obj) => {
        return Object.keys(obj).length
    }
}

module.exports = utils;