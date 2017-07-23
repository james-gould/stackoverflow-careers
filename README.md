# StackOverflow Careers API for Javascript applications.

An unofficial, maintained API to scrape the latest jobs from Stackoverflow Careers Jobs/RSS feeds. 
Unfortunately, due to limitations of the RSS feeds, only the latest 25 listings are available for any query. Make them more specific if you'd like deeper results.

# Usage

    let SO = require('stackoverflow-careers');

    SO.getCareers({
        Location: "Germany",
        TechLiked: ["javascript", "c#", "java"],
        Distance: 20 // Miles
    }, (result) => {
        // Do stuff with your job listings!
    });