# StackOverflow Careers API for Javascript applications.

An unofficial, maintained API to scrape the latest jobs from Stackoverflow Careers Jobs/RSS feeds. 
Unfortunately, due to limitations of the RSS feeds, only the latest 25 listings are available for any query. Make them more specific if you'd like deeper results.

# Usage

Before use, make sure you install the library with the following command:

    npm install stackoverflow-careers --save-dev

where `--save-dev` will add it to your `package.json` dependencies.

Next, add the following into your Nodejs project:

    let SO = require('stackoverflow-careers');

    StackOverflow.getCareers({
            location: "london",
            tl: ["javascript", "java", "c"],
            unit: "miles"
        }, (jobs) => {
            jobs.forEach((job) => {
                console.log(job);
            });
    });