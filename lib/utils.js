const EncodedCharacters = {
    '!': '%21',
    '"': '%22',
    '#': '%23',
    '$': '%24',
    '%': '%25',
    '&': '%26',
    '\'': '%27',
    '(': '%28',
    ')': '%29',
    '*': '%2A',
    '+': '%2B',
    ',': '%2C',
    '-': '%2D',
    '.': '%2E',
    '/': '%2F',
    ' ': '%20',
};

const Utils = {
    UrlPrefix: 'https://stackoverflow.com/jobs/feed?',
    Query: 'q=',
    Location: "&l=",
    Unit: "&u=",
    TechLiked: "&tl=",
    TechDisliked: "&td=",

    /**
     * Converts protected HTML characters and converts them to their encoded version. Eg:  # -> %23
     * @param {String} param - A string with (potentially) encoded characters 
     */
    EncodeProtectedCharacters(param) {
        const paramSplit = param.split('');
        let encodedCharacterString = '';

        paramSplit.forEach(char => {
            (Object.prototype.hasOwnProperty.call(EncodedCharacters, char)) ? encodedCharacterString += EncodedCharacters[char] : encodedCharacterString += char;
        });

        return encodedCharacterString;
    }
}

module.exports = {
    Utils,
}