let StackOverflow = require('./lib/SO.js');

StackOverflow.getCareers({
    URL: "https://stackoverflow.com/jobs/feed?q=c%23&amp;amp;l=London&amp;amp;d=20&amp;amp;u=Miles&amp;amp;tl=javascript"
}, (data) => {
    console.log(data);
});