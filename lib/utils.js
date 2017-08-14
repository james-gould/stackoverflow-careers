const Utils = {
    UrlPrefix: 'https://stackoverflow.com/jobs/feed?',
    Query: 'q=',
    Location: "&l=",
    Unit: "&u=",
    TechLiked: "&tl=",
    TechDisliked: "&td=",

    validObject: (obj) => {
        return Object.keys(obj).length
    }
}

module.exports = {
    Utils,
}