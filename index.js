let StackOverflow = require('./lib/SO.js');

StackOverflow.getCareers({}, (res) => {
    console.log(res);
});

module.exports = StackOverflow;