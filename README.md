# StackOverflow Careers API for Javascript applications.

An unofficial, maintained API to scrape the latest jobs from Stackoverflow Careers Jobs/RSS feeds. 
Unfortunately, due to limitations of the RSS feeds, only the latest 25 listings are available for any query. Make them more specific if you'd like deeper results.

# Usage

Before use, make sure you install the library with the following command:

    npm install stackoverflow-careers

Next, add the following into your Nodejs project:

    const StackOverflow = require('stackoverflow-careers');

    StackOverflow.getCareers({
        location: "london",
        query: "contractor positions", 
        techLiked: ["javascript", "java", "c"], 
        techDisliked: ["perl", "rust", "fortran"], 
        unit: "miles" 
    }, (jobs) => {
        jobs.forEach((job) => {
            console.log(job);
        });
    });


JSDocs have been added to exposed API endpoints, any further issues please feel free to open up an issue on the [Github repository](https://github.com/james-gould/stackoverflow-careers/issues)

# Changelog

**v1.1** - Implemented HTML character encoding to allow searches contained special characters. This means you won't be receiving results for `C` when you search for `C#`. Nifty!

**v1.2** Fixed some silly errors that I released to everyone following a deprecation. Sorry! Please `npm outdated && npm update` to make sure you have the latest version.

# Outstanding issues

- I'm aware that the output for the main job listing is full of HTML tags. I'm looking for a way to solve this ASAP (read: not in the quickest, most horrendous way possible) and I'm open to suggestions.
- The output objects are a bit nasty. I'll clean these up in the next release (a few days time when I get the chance).
