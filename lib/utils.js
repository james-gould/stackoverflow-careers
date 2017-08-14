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

const Utils = {
    UrlPrefix: 'https://stackoverflow.com/jobs/feed?',
    Query: 'q=',
    Location: "&l=",
    Unit: "&u=",
    TechLiked: "&tl=",
    TechDisliked: "&td=",

    IsValidObject(obj) {
        return Object.keys(obj).length
    },

    EncodeProtectedCharacters(param) {
        const paramSplit = param.split('');
        let encodedCharacterString = '';

        paramSplit.forEach((char) => {
            let isEncoded = false;
            EncodedChars.forEach(obj => {
                const matchedCharacter = obj[char];
                if(matchedCharacter !== 'undefined') {
                    encodedCharacterString += matchedCharacter;
                    isEncoded = true;
                    return;
                }
            });
            if(!isEncoded) { encodedCharacterString += char };
        })

        return encodedCharacterString;
    }
}

module.exports = {
    Utils,
}